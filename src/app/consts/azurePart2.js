export const azurePart2Content = {
    id: 8,
    title: "Azure for Data Engineers, Part 2: Blob Triggers, Service Bus, and Logic Apps",
    date: "2026-05-02",
    categories: ["Azure", "Data Engineering", "Cloud", "Serverless"],
    tags: ["azure", "data-engineering", "cloud", "python", "service-bus", "blob-trigger", "logic-apps", "event-driven", "serverless", "tutorial", "2026"],
    excerpt: "Build an event-driven Azure data pipeline where a file lands in Blob Storage, a function fires, Service Bus routes the message, and Logic Apps sends an automated email notification.",
    slug: "azure-data-engineers-part-2-blob-triggers-service-bus-logic-apps",
    readTime: 26,
    content: `
        <p><em>Your cron job runs every 15 minutes. Your data arrives at minute 1. That 14-minute gap is not a minor inconvenience. It is the entire difference between a reactive system and a polling system. This article fixes that.</em></p>
        <p><em>If you have not read Part 1, start there first. It covers storage setup, CLI, Python access, and deploying your first HTTP-triggered function. This article builds directly on that foundation.</em></p>

        <hr />

        <p><strong>What you will learn:</strong></p>
        <ul>
            <li>How to build a Blob Trigger that fires the moment a file lands, not 15 minutes later</li>
            <li>What Azure Service Bus is and why calling downstream services directly is the wrong approach</li>
            <li>The difference between Topics, one message many consumers, and Queues, one message one consumer</li>
            <li>Why Application Properties are the only way to make message filters work, and why the JSON body is useless for filtering</li>
            <li>How Dead Letter Queues, Peek Lock, and Scheduled Delivery protect your data when consumers fail</li>
            <li>How Azure Logic Apps wire all of this into an automated email notification without a single line of custom delivery code</li>
            <li>The complete pipeline: file lands, function fires, message routes, email sends</li>
        </ul>

        <hr />

        <h3>The Real Cost of Polling</h3>
        <p>Picture this. Your data team runs a batch job every 15 minutes to check an Azure container for new files. On a busy day, 200 files land. On a quiet night, zero. The scheduler does not know the difference. It wakes up, checks, finds nothing, spins down. Repeat, every 15 minutes, forever.</p>
        <p>That is compute running on an empty stomach. On the Consumption plan that is cheap. On a dedicated plan with 4 vCores allocated, you are burning money while the machine stares at an empty folder.</p>
        <p>Now imagine a file lands at 10:00:01 AM. The scheduler just ran at 10:00:00 AM. Your file sits in storage for 14 minutes and 59 seconds before anything touches it. For a healthcare data feed or a fraud detection pipeline, that is not a scheduling quirk. That is a product failure.</p>
        <p>Stop. Here is what event-driven architecture actually costs you: nothing, when nothing is happening. And when something does happen, it reacts in milliseconds, not minutes.</p>
        <p>This article builds three things. A Blob Trigger that reacts to file arrivals. A Service Bus that routes messages reliably between services. A Logic App that sends automated email notifications. All wired together into one pipeline with zero polling anywhere.</p>

        <hr />

        <h3>Part 1: Azure Function, Blob Trigger</h3>
        <h4>What It Does</h4>
        <p>A Blob Trigger starts your function automatically when a new file appears in a specific container. No scheduler. No cron expression. File lands, function fires.</p>
        <p>What your function does next is up to you. Common patterns:</p>
        <p>Send email alerts, Slack notifications, or pipeline completion messages. Trigger an Azure Data Factory job or a Spark application downstream. For small files in the 1,000 to 10,000 record range, extract the data with pandas right inside the function and write it directly to a database or stream.</p>
        <p>The trigger hands you two things: the blob name, including the container path, and the file size in bytes. Everything else you build from there.</p>

        <h4>How It Actually Works, This Part Surprises People</h4>
        <p>Here is the thing: the blob trigger does not actually watch your container in real time. What really happens: Azure Storage writes internal blob receipts to the <code>AzureWebJobsStorage</code> account. The Functions runtime polls those receipts to detect new blobs. On the Consumption plan, that polling can have up to a 10-minute lag.</p>
        <p>That is why <code>AzureWebJobsStorage</code> is mandatory in your settings. Without it, the runtime has nowhere to write or read those receipts, and the function fails to start. More on that in a moment.</p>
        <blockquote><p><strong>April 2026 update from Microsoft docs:</strong> For new implementations, Microsoft now recommends the Event Grid source for near real-time processing instead of the default polling method. You enable it with one extra parameter: <code>source="EventGrid"</code>. On the Flex Consumption plan it is mandatory. On the standard Consumption plan it is optional but strongly recommended for production. The polling method works fine for learning.</p></blockquote>

        <h4>Setting It Up in VS Code</h4>
        <p>In VS Code, click the lightning bolt icon in the Azure extension panel, select Create Function, and configure:</p>
        <pre><code>Language:           Python
Programming Model:  V2
Python Version:     3.11 or 3.12
Trigger Type:       Azure Blob Storage trigger
Function Name:      blobTriggerDev
Path:               landing-zn/{name}
Storage Account:    your remote storage account</code></pre>
        <p>The path <code>landing-zn/{name}</code> deserves attention. You do not provide the full storage URL. You start from the container name. The <code>{name}</code> part is a binding expression that captures whatever file lands in that container. You could write <code>landing-zn/{folder}/{name}</code> to monitor a specific subfolder instead.</p>

        <h4>The Generated Code</h4>
        <p>VS Code creates this <code>function_app.py</code>:</p>
        <pre><code>import azure.functions as func
import logging

app = func.FunctionApp()

@app.blob_trigger(arg_name="myblob", path="landing-zn/{name}",
                  connection="myblobstorage_STORAGE")
def blobTriggerDev(myblob: func.InputStream):
    logging.info(f"Blob trigger function processed blob\\n"
                 f"Name: {myblob.name}\\n"
                 f"Size: {myblob.length} bytes")</code></pre>
        <p>Break it down: <code>@app.blob_trigger</code> is the V2 decorator that replaces the old <code>function.json</code> file entirely. <code>arg_name="myblob"</code> names the input, giving you an InputStream object back. <code>connection="myblobstorage_STORAGE"</code> is not the connection string itself. It is the name of the setting in your config file that holds the connection string. That distinction trips up almost everyone the first time.</p>
        <p><code>myblob.name</code> gives you the full path like <code>landing-zn/healthcare_dataset.csv</code>. <code>myblob.length</code> is the file size in bytes.</p>
        <p>For Event Grid, the production recommendation:</p>
        <pre><code>@app.blob_trigger(arg_name="myblob", path="landing-zn/{name}",
                  connection="myblobstorage_STORAGE",
                  source="EventGrid")
def blobTriggerDev(myblob: func.InputStream):
    logging.info(f"Name: {myblob.name}, Size: {myblob.length} bytes")</code></pre>
        <p>One extra parameter. Near real-time processing. Worth it for production.</p>

        <h4>The Config File That Breaks Everything If You Skip It</h4>
        <p>Find your storage connection string: in the portal, go to your storage account, open Security and networking in the sidebar, click Access keys, click Show next to key1, copy the full string starting with <code>DefaultEndpointsProtocol=https;</code>.</p>
        <p>Paste it into <code>local.settings.json</code>:</p>
        <pre><code>{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "&lt;your-storage-connection-string&gt;",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
    "myblobstorage_STORAGE": "&lt;your-storage-connection-string&gt;"
  }
}</code></pre>
        <p>Both keys point to the same connection string here. <code>AzureWebJobsStorage</code> is what the runtime uses internally to track blob receipts. <code>myblobstorage_STORAGE</code> is what the trigger uses to actually monitor the container.</p>
        <p>Leave <code>AzureWebJobsStorage</code> empty and the function fails to start with a cryptic missing connection string error. This is the number one issue beginners hit. Now you will not hit it.</p>

        <h4>Running It Locally</h4>
        <pre><code>source .venv/bin/activate    # Mac and Linux
.venv\\Scripts\\activate       # Windows

pip install -r requirements.txt
func start</code></pre>
        <p>Wait until you see the function name listed in the terminal output. Then go to the portal, open your <code>landing-zn</code> container, upload any file. Switch back to your terminal. Within seconds:</p>
        <pre><code>Blob trigger function processed blob
Name: landing-zn/yourfile.csv
Size: 1234 bytes</code></pre>
        <p>If you see that, the trigger works. If you do not, check <code>AzureWebJobsStorage</code> first.</p>

        <h4>Making It Do Something Useful</h4>
        <p>Logging metadata is nice. Triggering a downstream pipeline is better. Here is the real implementation: it checks if the arriving file is a CSV, then publishes a notification to Azure Service Bus so downstream services know exactly what arrived:</p>
        <pre><code>import azure.functions as func
import logging
from azure.servicebus import ServiceBusClient, ServiceBusMessage
import os

app = func.FunctionApp()

@app.blob_trigger(arg_name="myblob", path="landing-zn/{name}",
                  connection="myblobstorage_STORAGE")
def blobTriggerDev(myblob: func.InputStream):

    blob_name = myblob.name
    service_bus_connection_str = os.getenv("SERVICE_BUS_CONNECTION_STRING")
    topic_name = os.getenv("SERVICE_BUS_TOPIC_NAME")

    if blob_name.endswith(".csv"):
        logging.info(f"CSV file detected: {blob_name}")
    else:
        logging.info(f"Ignored: {blob_name} (not a CSV file)")

    custom_message = f"{blob_name} blob arrived in storage account container !!"
    custom_subject = "Azure Function to Service Bus Message"

    servicebus_client = ServiceBusClient.from_connection_string(
        conn_str=service_bus_connection_str, logging_enable=True
    )
    with servicebus_client:
        sender = servicebus_client.get_topic_sender(topic_name=topic_name)
        with sender:
            message = ServiceBusMessage(
                body=custom_message,
                subject=custom_subject
            )
            sender.send_messages(message)

    logging.info(f"Message sent to Service Bus Topic {topic_name}")</code></pre>
        <p>Your <code>requirements.txt</code> needs both packages:</p>
        <pre><code># DO NOT include azure-functions-worker in this file
azure-functions
azure-servicebus</code></pre>
        <p>Your <code>host.json</code> is auto-generated and controls the extension bundle version. Keep it as generated:</p>
        <pre><code>{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  }
}</code></pre>
        <p>The <code>extensionBundle</code> version <code>[4.*, 5.0.0)</code> is what gives your function access to Blob, Service Bus, and other triggers without installing individual extension packages manually. Do not change this unless you have a specific reason to pin a version.</p>
        <blockquote><p><strong>2026 SDK notice:</strong> On September 30, 2026, the old SDK libraries <code>WindowsAzure.ServiceBus</code> and <code>Microsoft.Azure.ServiceBus</code> are retired. Always use <code>azure-servicebus</code> 7.x. Latest stable as of April 2026 is <strong>7.14.2</strong>.</p></blockquote>
        <p>Your <code>local.settings.json</code> for the full implementation:</p>
        <pre><code>{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "&lt;storage-connection-string&gt;",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
    "myblobstorage_STORAGE": "&lt;storage-connection-string&gt;",
    "SERVICE_BUS_CONNECTION_STRING": "&lt;service-bus-connection-string&gt;",
    "SERVICE_BUS_TOPIC_NAME": "test_topic"
  }
}</code></pre>

        <h4>Deploying to Azure</h4>
        <p>Right-click your workspace in VS Code and select Create Function App in Azure, Advanced:</p>
        <pre><code>Name:            globally-unique name
Runtime:         Python 3.11
Hosting Plan:    Consumption
OS:              Linux
Resource Group:  your existing resource group
Storage Account: your existing storage account</code></pre>
        <p>Deploy, wait 60 to 90 seconds, then open the portal. Go to your Function App, open Settings, click Environment Variables, and add every key from your <code>local.settings.json</code>. Click Apply and Confirm.</p>
        <p>This step is non-negotiable. <code>local.settings.json</code> is never deployed to Azure. It exists only for local development. If you skip the environment variables in the portal, the function starts but never does anything useful.</p>
        <p><strong>Monitoring</strong> lives under Function App, then Monitor. Three tools are available:</p>
        <p><strong>Invocations</strong> shows each individual execution with timestamp, success or failure, duration, and a link to the full log output for that run. If something broke at 2 AM, this is where you find out exactly which invocation failed and why.</p>
        <p><strong>Application Insights</strong> captures detailed request tracing if you enabled it during Function App creation. More granular than the Invocations tab, and queryable for pattern analysis.</p>
        <p><strong>Metrics</strong> provides execution counts and success/failure graphs over time. Useful for spotting whether failure rates are climbing or whether invocations are spiking unexpectedly.</p>
        <p>On the free tier, there is a latency of up to five minutes before any of these reflect recent activity. Upload a file and see nothing for a few minutes. That is normal, not broken.</p>
        <p>Also note: once you deploy from VS Code, the portal shows "portal editing is disabled." That is correct behavior. VS Code is your source of truth. You manage and monitor from the portal but edit code locally.</p>
        <p>The blob trigger is done. A file arrives, the function wakes up, the metadata gets captured, and a message heads to Service Bus. Now let's build the part that receives it.</p>

        <hr />

        <h3>Part 2: Azure Service Bus, The Message Backbone</h3>
        <h4>Why Not Just Call the Next Service Directly?</h4>
        <p>You could. Your blob trigger could call a downstream API directly via HTTP. It is simpler to write. It also means if that downstream service is down, your function fails. If it is slow, your function waits. If it gets overwhelmed, your function backs off. The two services are now coupled at the hip.</p>
        <p>Azure Service Bus breaks that coupling. Your function drops a message into the bus and moves on. Downstream services pick it up when they are ready. If they are down, the message waits. If they crash mid-processing, the message goes back. If the same message somehow arrives twice, duplicate detection catches it.</p>
        <p>That is the pitch. Let's look at the components.</p>

        <h4>Service Bus vs Kafka: The Comparison That Comes Up in Every Interview</h4>
        <p>Both use the word "topics." Do not let that fool you. They solve different problems.</p>
        <table>
            <thead>
                <tr>
                    <th>Aspect</th>
                    <th>Azure Service Bus</th>
                    <th>Apache Kafka</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Message model</td>
                    <td>Broker, messages consumed and deleted</td>
                    <td>Distributed log, messages retained for a period</td>
                </tr>
                <tr>
                    <td>Parallelism</td>
                    <td>Single receiver per message or filtered subscribers</td>
                    <td>Consumer groups allow multiple independent readers</td>
                </tr>
                <tr>
                    <td>Locking</td>
                    <td>Exclusive lock per message</td>
                    <td>Consumers track their own offsets, no locking</td>
                </tr>
                <tr>
                    <td>Scale</td>
                    <td>Cloud-native Azure integration, moderate throughput</td>
                    <td>Massive scale, millions of events per second</td>
                </tr>
                <tr>
                    <td>Ideal use</td>
                    <td>Decoupling microservices, workflow triggers, notifications</td>
                    <td>Real-time streaming, event sourcing, log aggregation</td>
                </tr>
            </tbody>
        </table>
        <p>Service Bus is for cloud-native integration within Azure. Kafka is for high-throughput streaming at a scale where Service Bus would buckle. They are not interchangeable.</p>

        <h4>Creating a Service Bus Namespace</h4>
        <p>In the portal search bar, type "Service Bus" and click Create. The one field that matters most:</p>
        <p><strong>Pricing Tier: Standard.</strong> The Basic tier does not support Topics. Only Queues. If you pick Basic and then wonder why you cannot find Topics in the UI, that is why. Standard supports both Topics and Queues. Use Standard.</p>
        <p>Fill in the rest:</p>
        <pre><code>Resource Group: your existing resource group
Namespace Name: globally unique, for example myservicebus-dev
Location:       same region as your storage account
Pricing Tier:   Standard</code></pre>
        <p>After deployment, grab your connection string: Settings in the sidebar, Shared access policies, RootManageSharedAccessKey, copy the Primary Connection String.</p>
        <blockquote><p><strong>Production note, 2026 recommendation:</strong> Connection strings are fine for learning. In production, use <code>DefaultAzureCredential</code> from the <code>azure-identity</code> package with a managed identity. No strings to store, no rotation to manage, no accidental commits to GitHub.</p></blockquote>
        <pre><code>from azure.identity import DefaultAzureCredential
from azure.servicebus import ServiceBusClient

credential = DefaultAzureCredential()
client = ServiceBusClient(
    fully_qualified_namespace="&lt;namespace&gt;.servicebus.windows.net",
    credential=credential
)</code></pre>
        <p>Okay. Namespace is ready. Now let's talk about Topics and Queues, which work differently and each has a specific job.</p>

        <hr />

        <h3>Part 3: Service Bus Topics, One Message, Many Consumers</h3>
        <h4>The Mental Model</h4>
        <p>Think of a radio station. The station broadcasts one signal. Every radio tuned to that frequency receives it. Radios tuned to different frequencies receive nothing. Each radio processes its own copy independently.</p>
        <p>That is exactly how Topics work. One publisher sends one message. Every subscription receives an independent copy. Each subscription can have a filter, so only the messages matching its criteria actually arrive. The rest are silently ignored.</p>
        <p>Real-world example: your backend publishes a single "new order" event. Four things need to happen: the email service sends a confirmation, the inventory service decrements stock, the analytics service logs the event, and the fraud service checks the pattern. With Topics, one message triggers all four. No four separate API calls. No tight coupling.</p>
        <p>Data engineering example: your Data Factory job fails at 2 AM. One message to a topic. The DevOps subscription sends a PagerDuty alert. The logging subscription writes to Cosmos DB. The audit subscription writes to blob storage. All from one failure event.</p>

        <h4>Key Features</h4>
        <p><strong>Publish-Subscribe Model:</strong> One-to-many. Every active subscription gets a copy.</p>
        <p><strong>Message Filtering:</strong> Define SQL-like rules on subscriptions. Only messages where <code>priority = 'high'</code> reach the high-priority subscription. Everything else is ignored at the bus level, not in your code.</p>
        <p><strong>Dead Letter Queues:</strong> Failed or expired messages move to a DLQ automatically. You never lose a message. You analyse failures at your own pace.</p>
        <p><strong>Duplicate Detection:</strong> Set a detection window, 5 days for example. If the same message arrives twice within that window, the bus drops the duplicate. Configured at topic creation, not in code.</p>
        <p><strong>Lock Duration:</strong> When a subscription pulls a message, it is locked. No other subscriber can touch it during that lock window. If processing fails, the lock expires and the message becomes available again. Nothing is lost.</p>

        <h4>Creating a Topic and Two Subscriptions</h4>
        <p>Inside your namespace, click Topics in the left sidebar, then click the plus sign to add a topic:</p>
        <pre><code>Name:                  test_topic
Max topic size:        1 GB
Message TTL:           14 days
Duplicate detection:   enable if needed</code></pre>
        <p>Now add two subscriptions by clicking into <code>test_topic</code>, then Subscriptions, then the plus sign.</p>
        <p>Subscription 1, receives everything:</p>
        <pre><code>Name:                                 default_sub
Max delivery count:                   10
Lock duration:                        1 minute
Dead letter on message expiration:    Yes</code></pre>
        <p>Subscription 2, filter-based:</p>
        <pre><code>Name:                                 filter_based_sub
Same settings as default_sub</code></pre>

        <h4>Adding a Filter</h4>
        <p>By default every subscription has a True filter written as <code>1=1</code>, meaning it accepts every message. To change that for <code>filter_based_sub</code>:</p>
        <p>Go to your namespace, Topics, <code>test_topic</code>, Subscriptions, click <code>filter_based_sub</code>, then open Rules in the sidebar. You will see the default <code>$Default</code> rule with <code>1=1</code>. Click Add, give it a name like <code>high-priority-only</code>, set filter type to SQL Filter, and write the expression:</p>
        <pre><code>priority = 'high'</code></pre>
        <p>Save it. Delete the old <code>1=1</code> rule if it was not removed automatically.</p>
        <p>You can build more complex conditions:</p>
        <pre><code>region = 'north' AND priority = 'high'</code></pre>
        <p>Or use a Correlation Filter for matching system properties like Message ID or Session ID without writing SQL syntax.</p>

        <h4>Stop. This Is the Part Everyone Gets Wrong.</h4>
        <p>Filters look at message-level properties. Not at the JSON body. The filter engine cannot read inside your payload.</p>
        <p>Here is the wrong approach that looks perfectly reasonable until your filter does nothing:</p>
        <pre><code># This filter will never work -- the bus cannot see inside the JSON body
message = ServiceBusMessage(
    body=json.dumps({"priority": "high", "region": "north"})
)</code></pre>
        <p>Here is the correct approach. You must expose the values the filter needs as Application Properties, which are flat key-value pairs attached to the message envelope:</p>
        <pre><code># This works -- priority and region are visible to the filter engine
message = ServiceBusMessage(
    body=json.dumps(message_body),
    application_properties={
        "region": message_body["region"],
        "priority": message_body["priority"]
    }
)</code></pre>
        <p>For nested JSON, you must manually flatten the values you want to filter on:</p>
        <pre><code># message_body = {"address": {"city": "Mumbai", "country": "India"}}
application_properties={
    "country": message_body["address"]["country"]
}</code></pre>
        <p>The filter engine cannot navigate nested structures. Flatten what you need. This is not a bug or a limitation to work around. It is the intended design. Application Properties are the interface between message content and routing logic.</p>

        <h4>Mock Producer for Topics</h4>
        <p>To test without a real data source, use this script. It generates random order data every 5 seconds and publishes to the topic with the correct application properties:</p>
        <pre><code># mock_data_to_topic.py
# Requires: azure-servicebus &gt;= 7.12.0

import json
import time
import random
from azure.servicebus import ServiceBusClient, ServiceBusMessage

CONNECTION_STR = "&lt;your-service-bus-connection-string&gt;"
TOPIC_NAME = "test_topic"

def generate_mock_message():
    return {
        "orderId": str(random.randint(1000, 9999)),
        "customerName": random.choice(["John Doe", "Jane Smith",
                                        "Alice Brown", "Bob Johnson"]),
        "region": random.choice(["north", "south", "east", "west"]),
        "priority": random.choice(["low", "medium", "high"]),
        "orderAmount": round(random.uniform(100, 1000), 2)
    }

def send_message_to_service_bus(client, topic_name, message_body):
    sender = client.get_topic_sender(topic_name=topic_name)
    with sender:
        message = ServiceBusMessage(
            body=json.dumps(message_body),
            application_properties={
                "region": message_body["region"],
                "priority": message_body["priority"]
            }
        )
        sender.send_messages(message)
        print(f"Sent: {message_body}")

def main():
    servicebus_client = ServiceBusClient.from_connection_string(
        conn_str=CONNECTION_STR, logging_enable=True
    )
    try:
        while True:
            message_body = generate_mock_message()
            send_message_to_service_bus(servicebus_client, TOPIC_NAME, message_body)
            time.sleep(5)
    finally:
        servicebus_client.close()

if __name__ == "__main__":
    main()</code></pre>
        <blockquote><p><strong>Thread safety, from official docs:</strong> <code>ServiceBusClient</code>, <code>ServiceBusSender</code>, and <code>ServiceBusReceiver</code> are not thread-safe. Do not share them across threads. Create separate instances per thread.</p></blockquote>
        <p>Run the script and publish five messages. <code>default_sub</code> receives all five. <code>filter_based_sub</code> receives only the ones where <code>priority</code> was randomly assigned as <code>high</code>. The filter works at the bus level before your function ever runs.</p>

        <h4>Peek Mode vs Receive Mode</h4>
        <p>The Service Bus Explorer in the portal gives you two ways to inspect messages:</p>
        <p><strong>Peek Mode</strong> is read-only. You see the message body and metadata, sequence number, enqueue time, expiration, without removing it. The message stays active and available to real consumers. Use this when testing to see what is arriving without disrupting actual processing.</p>
        <p><strong>Receive Mode, Receive and Delete</strong> removes the message the moment it is read. Use this to manually clear test messages or simulate actual consumption.</p>
        <p>Short version: Peek to look, Receive to consume.</p>

        <h4>Creating the Topic Trigger Function</h4>
        <p>This is a separate project. Create a new folder, open it in VS Code, click the lightning bolt, select Create Function, and configure:</p>
        <pre><code>Trigger:           Service Bus Topic Trigger
Function Name:     servicebusTopicTrigger
Topic Name:        test_topic
Subscription Name: filter_based_sub</code></pre>
        <p>Your <code>function_app.py</code>:</p>
        <pre><code>import azure.functions as func
import logging

app = func.FunctionApp()

@app.service_bus_topic_trigger(arg_name="azservicebus",
                               subscription_name="filter_based_sub",
                               topic_name="test_topic",
                               connection="myservicebus_SERVICEBUS")
def servicebusTopicTrigger(azservicebus: func.ServiceBusMessage):
    logging.info("ServiceBus Topic trigger processed a message: %s",
                 azservicebus.get_body().decode("utf-8"))</code></pre>
        <p><code>local.settings.json</code>:</p>
        <pre><code>{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "&lt;storage-connection-string&gt;",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
    "myservicebus_SERVICEBUS": "&lt;service-bus-connection-string&gt;"
  }
}</code></pre>
        <p><code>requirements.txt</code> only needs <code>azure-functions</code>. The Service Bus connection is handled by the extension bundle automatically, so you do not need to add <code>azure-servicebus</code> here:</p>
        <pre><code># DO NOT include azure-functions-worker
azure-functions</code></pre>
        <p><strong>Testing it:</strong> Start the function in one terminal with <code>func start</code>. Open a second terminal and run <code>python mock_data_to_topic.py</code>. Watch the first terminal. Every message where <code>priority = 'high'</code> shows up instantly. Everything else is silent. Once the function processes a message, it is deleted from the subscription automatically.</p>
        <p>Topics done. You now have a filter that routes messages at the bus level without writing routing logic in your code. That is the point.</p>

        <hr />

        <h3>Part 4: Service Bus Queues, One Message, One Consumer</h3>
        <h4>How Queues Differ From Topics</h4>
        <p>Topics broadcast. Queues deliver. Each message in a queue is processed by exactly one receiver. No subscriptions. No filters. Message comes in, one consumer picks it up, message is gone.</p>
        <p>Think of a call center queue. Customers wait in order. One agent answers one call at a time. The customer at the front of the line goes first. That is FIFO: First In, First Out.</p>

        <h4>The FIFO Model</h4>
        <p>Queues process messages in the order they arrive. This matters for scenarios where sequence is not optional: order fulfillment, booking confirmations, financial transaction logs. The second transaction cannot process before the first one clears.</p>
        <p>For strict sequence guarantees, enable Message Sessions during queue creation. Sessions group related messages so they are processed in exact arrival order by a single consumer. Useful when standard FIFO is not strict enough for your use case.</p>

        <h4>Creating a Queue</h4>
        <p>Inside your namespace, click Queues in the left sidebar, then the plus sign:</p>
        <pre><code>Name:                          test_queue
Max queue size:                1 GB
Message TTL:                   14 days
Lock duration:                 30 seconds to 5 minutes
Dead lettering on expiration:  Yes</code></pre>

        <h4>Key Features</h4>
        <p><strong>Lock Duration:</strong> When a receiver picks up a message, it acquires an exclusive lock. No other consumer can touch it while the lock is active. If the receiver crashes or takes too long, the lock expires and the message becomes visible again. You never lose a message because a consumer died mid-processing.</p>
        <p><strong>Dead Letter Queues:</strong> When a message cannot be processed after the maximum delivery count, or when it expires, it moves to the DLQ automatically. You can flush DLQ messages to Blob Storage as CSV or JSON for later analysis. Design your pipelines for failure, not just the happy path.</p>
        <p><strong>Scheduled Delivery:</strong> You can delay message delivery by a set duration. Message published at 10:00 AM with a one-minute delay does not arrive at the consumer until 10:01 AM. Useful when your consumer is under load and would be overwhelmed by an immediate flood. The queue acts as a speed governor between producer and consumer.</p>
        <p><strong>Receive Modes:</strong></p>
        <p><strong>Peek Lock</strong> locks the message during processing and only deletes it after confirmed success. If processing fails, the lock expires and the message becomes available again. More reliable.</p>
        <p><strong>Receive Delete</strong> deletes the message immediately on delivery. If processing crashes after that, the message is gone. Faster, but riskier. Use only when losing a message on failure is acceptable.</p>

        <h4>Mock Producer for Queues</h4>
        <p>This script generates random IoT device telemetry and publishes to the queue every 5 seconds:</p>
        <pre><code># mock_data_to_queue.py
# Requires: azure-servicebus &gt;= 7.12.0

import json
import random
import time
from azure.servicebus import ServiceBusClient, ServiceBusMessage

CONNECTION_STR = "&lt;your-service-bus-connection-string&gt;"
QUEUE_NAME = "test_queue"

def generate_iot_data():
    return {
        "deviceId": f"device_{random.randint(1, 100)}",
        "temperature": round(random.uniform(20.0, 35.0), 2),
        "humidity": round(random.uniform(30.0, 60.0), 2),
        "batteryLevel": round(random.uniform(10.0, 100.0), 2),
        "timestamp": time.time()
    }

def send_message_to_queue(client, queue_name, message_body):
    sender = client.get_queue_sender(queue_name=queue_name)
    with sender:
        message = ServiceBusMessage(body=json.dumps(message_body))
        sender.send_messages(message)
        print(f"Sent IoT message: {message_body}")

def main():
    servicebus_client = ServiceBusClient.from_connection_string(
        conn_str=CONNECTION_STR, logging_enable=True
    )
    try:
        while True:
            message_body = generate_iot_data()
            send_message_to_queue(servicebus_client, QUEUE_NAME, message_body)
            time.sleep(5)
    finally:
        servicebus_client.close()

if __name__ == "__main__":
    main()</code></pre>
        <p>No application properties here because there is no filter engine on queues. The message body is the full payload.</p>

        <h4>Creating the Queue Trigger Function</h4>
        <p>New folder, VS Code, lightning bolt, Create Function:</p>
        <pre><code>Trigger:           Service Bus Queue Trigger
Function Name:     servicebusQueueTrigger
Queue Name:        test_queue</code></pre>
        <p><code>function_app.py</code>:</p>
        <pre><code>import azure.functions as func
import logging

app = func.FunctionApp()

@app.service_bus_queue_trigger(arg_name="azservicebus",
                               queue_name="test_queue",
                               connection="myservicebus_SERVICEBUS")
def servicebusQueueTrigger(azservicebus: func.ServiceBusMessage):
    logging.info("ServiceBus Queue trigger processed a message: %s",
                 azservicebus.get_body().decode("utf-8"))</code></pre>
        <p>Start the function in one terminal. Run the mock queue script in a second terminal. The function picks up each IoT message the moment it arrives and logs the device data. One publisher, one consumer, strict order, nothing lost.</p>
        <p>Your workspace now has three separate function projects:</p>
        <pre><code>your-workspace/
  blob-trigger-project/       (detects file arrivals, publishes to topic)
  topic-trigger-project/      (reads filtered messages from topic)
  queue-trigger-project/      (reads IoT data from queue)
  mock_data_to_topic.py
  mock_data_to_queue.py</code></pre>
        <p>Now let's add the last piece. The one that requires zero custom delivery code.</p>

        <hr />

        <h3>Part 5: Azure Logic Apps, Automation Without Code</h3>
        <h4>What It Is</h4>
        <p>Imagine you could draw a workflow: "when this happens, do that, then do this" and have Azure run it forever without you maintaining any infrastructure. That is Logic Apps.</p>
        <p>It is a visual workflow designer with over 300 built-in connectors. Office 365, Salesforce, SAP, Slack, SharePoint, SQL Server, and hundreds more. You connect them with drag-and-drop. No custom integration code to write, host, or maintain.</p>
        <p>For data engineers, Logic Apps sits at the end of a pipeline as the delivery mechanism. Your function does the heavy lifting. Logic Apps handles the notification, the database write, the approval request, or the Teams message.</p>

        <h4>Key Features</h4>
        <p><strong>Pre-Built Connectors:</strong> Over 300 connectors including Microsoft services like Office 365 and SharePoint, plus third-party services. If you are connecting to a popular service, the connector already exists.</p>
        <p><strong>Triggers and Actions:</strong> Every workflow starts with a trigger, such as a Service Bus message, an HTTP request, a scheduled time, or a file appearing in storage, and executes a chain of actions, such as send email, insert a record, or call an API.</p>
        <p><strong>Conditions and Loops:</strong> Add if-else branching, for-each loops, and switches for multi-path workflows without writing conditional logic.</p>
        <p><strong>Scalability and Reliability:</strong> Automatically scales with demand. Built-in retry mechanisms handle transient failures.</p>
        <p><strong>Enterprise Integration:</strong> Supports XML, JSON, EDI, and AS2. Suitable for B2B scenarios where your system needs to talk to a partner's system in a structured format.</p>

        <h4>Common Use Cases</h4>
        <p>Business process automation like approval workflows and employee onboarding. Data synchronization between CRM and cloud platforms. Event-driven notifications when pipeline jobs fail, files arrive, or performance thresholds are breached. These are the scenarios where writing and hosting custom code is overkill. Logic Apps does it in minutes.</p>
        <p>One real-world pattern worth understanding: a booking application. A user submits a booking through a web app. The request lands as a message in a Service Bus Queue. A Logic App listens to that queue and routes the request to a Function App, which checks availability and decides to confirm or reject. The Function App then publishes a result message back to a Service Bus Topic labeled "confirmed" or "rejected." Downstream subscriptions handle notifications, database writes, and audit logging independently. The entire flow is event-driven, with Logic Apps acting as the orchestration layer. No tight coupling between any two services.</p>

        <h4>The Email Notification Pipeline</h4>
        <p>Here is the complete workflow built in this course. It is four steps but it does something that would take hours to build from scratch:</p>
        <p><strong>Step 1:</strong> A file lands in the <code>landing-zn</code> container. The Blob Trigger function fires. It reads the blob name, checks if it is a CSV, and publishes a message to the <code>email-notify</code> Service Bus Topic.</p>
        <p><strong>Step 2:</strong> The Service Bus Topic receives the message. Subscriptions deliver copies to any configured consumers.</p>
        <p><strong>Step 3:</strong> A Logic App monitors the <code>email-notify</code> topic. The moment a message arrives, it triggers automatically, reads the message content, and fires the next action.</p>
        <p><strong>Step 4:</strong> The Logic App sends an email via Outlook to the designated team with the subject "Blob file arrival notification" and the body containing the blob name and container details.</p>
        <p>From file landing to email sent, the whole chain runs in seconds with no manual intervention.</p>
        <p><strong>Verified from testing:</strong> The Logic App ran successfully twice, picking up messages and sending emails via Outlook with the exact subject and body. Both steps, read from topic and send email, executed successfully with the expected content.</p>

        <h4>Creating the Logic App</h4>
        <p>In the portal, search for "Logic Apps" and click Create:</p>
        <pre><code>Resource Group: your existing resource group
Name:           my-file-notification-logic-app
Region:         same as other resources
Plan:           Consumption</code></pre>
        <p>After deployment, open the Logic App Designer and select the blank workflow template. For the trigger, search for "Service Bus" and select "When a message is received in a topic subscription." Connect it to your namespace, select <code>email-notify</code> as the topic, and pick your subscription.</p>
        <p>Click the plus sign to add an action. Search for "Outlook" or "Send an email." Configure the recipient, subject, and body using the dynamic content from the Service Bus message. Save the workflow.</p>
        <p>Upload a file to your storage container. Within seconds the Logic App triggers, the email sends. The whole pipeline runs itself.</p>

        <hr />

        <h3>The Complete Pipeline</h3>
        <p>Let's be clear about what we just built. Here is every step, end-to-end:</p>
        <pre><code>1. File uploaded to landing-zn container

2. Blob Trigger fires instantly
   Reads blob name and size
   Checks if CSV
   Publishes notification to Service Bus Topic
   Logs confirmation

3. Service Bus Topic (email-notify)
   Message lands in topic
   All subscriptions receive a copy
   Filtered subscriptions route selectively by priority, region, or any property

4. Logic App detects new message
   Reads message content
   Sends email via Outlook with blob name and container details

5. Email arrives in team inbox
   Subject: Blob file arrival notification
   Zero code written for the email delivery step</code></pre>
        <p>No polling at any step. No schedulers. No idle compute. A file lands, and within seconds the right people know exactly what arrived and where. That is event-driven architecture.</p>

        <hr />

        <h3>Deployment Checklist</h3>
        <p>Moving from local to the portal means one thing more than anything else: add your environment variables. <code>local.settings.json</code> is never deployed. Without the variables, functions start but never trigger correctly.</p>
        <p>For each function app in the portal, go to Settings, click Environment Variables, and add:</p>
        <p>Blob Trigger project: <code>myblobstorage_STORAGE</code>, <code>SERVICE_BUS_CONNECTION_STRING</code>, <code>SERVICE_BUS_TOPIC_NAME</code></p>
        <p>Topic Trigger project: <code>myservicebus_SERVICEBUS</code></p>
        <p>Queue Trigger project: <code>myservicebus_SERVICEBUS</code></p>
        <p>Click Apply, then Confirm. That is it.</p>

        <hr />

        <h3>What Is Coming in Part 3</h3>
        <p>The reactive layer is done. Part 3 moves into the heavy-lift data services: Azure Data Factory for visual pipeline orchestration, Synapse Analytics where the data lake meets a SQL warehouse, Cosmos DB for NoSQL patterns, and Event Hub for streaming at scale.</p>
        <p>Before Part 3, stop everything you are not actively using. Go to each Function App and click Stop. Disable the Logic App. Azure free trial credits are finite and these resources run continuously if you forget them.</p>

        <hr />

        <h3>Quick Reference</h3>
        <h4>Verified Package Versions, April 2026</h4>
        <table>
            <thead>
                <tr>
                    <th>Package</th>
                    <th>Latest Stable</th>
                    <th>Min Python</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>azure-servicebus</td>
                    <td>7.14.2</td>
                    <td>3.9</td>
                    <td>Use 7.x only, older SDKs retire Sep 30, 2026</td>
                </tr>
                <tr>
                    <td>azure-functions</td>
                    <td>1.21.x</td>
                    <td>3.9</td>
                    <td>Runtime 4.x only</td>
                </tr>
                <tr>
                    <td>azure-identity</td>
                    <td>1.19.x</td>
                    <td>3.9</td>
                    <td>Use for production auth instead of connection strings</td>
                </tr>
            </tbody>
        </table>

        <h4>SDK Retirement Deadline</h4>
        <p>On September 30, 2026, the Service Bus libraries <code>WindowsAzure.ServiceBus</code>, <code>Microsoft.Azure.ServiceBus</code>, and <code>com.microsoft.azure.servicebus</code> are retired along with the SBMP protocol. Use <code>azure-servicebus</code> 7.x with the AMQP protocol.</p>

        <h4>Service Bus at a Glance</h4>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Topic</th>
                    <th>Queue</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Model</td>
                    <td>One-to-many broadcast</td>
                    <td>One-to-one point-to-point</td>
                </tr>
                <tr>
                    <td>Filtering</td>
                    <td>SQL and Correlation filters on subscriptions</td>
                    <td>Not applicable</td>
                </tr>
                <tr>
                    <td>AWS equivalent</td>
                    <td>SNS</td>
                    <td>SQS</td>
                </tr>
                <tr>
                    <td>Use when</td>
                    <td>Multiple consumers need the same message</td>
                    <td>One consumer processes each message</td>
                </tr>
            </tbody>
        </table>

        <h4>Peek Lock vs Receive Delete</h4>
        <table>
            <thead>
                <tr>
                    <th>Mode</th>
                    <th>Deletion timing</th>
                    <th>Reliability</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Peek Lock</td>
                    <td>Only after successful processing</td>
                    <td>Higher, message recovers on failure</td>
                </tr>
                <tr>
                    <td>Receive Delete</td>
                    <td>Immediately on delivery</td>
                    <td>Faster, but message lost if processing fails</td>
                </tr>
            </tbody>
        </table>

        <h4>Function Trigger Decorators</h4>
        <pre><code>Blob Trigger:    @app.blob_trigger(path="container/{name}", connection="KEY")
Topic Trigger:   @app.service_bus_topic_trigger(subscription_name, topic_name, connection)
Queue Trigger:   @app.service_bus_queue_trigger(queue_name, connection)</code></pre>

        <h4>Where to Find Connection Strings</h4>
        <pre><code>Storage:      Storage Account  &gt;  Security + networking  &gt;  Access keys
Service Bus:  Namespace  &gt;  Settings  &gt;  Shared access policies  &gt;  RootManageSharedAccessKey</code></pre>

        <hr />

        <p><em>All versions and syntax verified against Microsoft Learn, PyPI, and GitHub. April 2026.</em></p>
    `
};

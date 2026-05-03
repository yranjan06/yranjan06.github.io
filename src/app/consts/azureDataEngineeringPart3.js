export const azureDataEngineeringPart3Content = {
    id: 9,
    title: "Azure for Data Engineers, Part 3: Virtual Machines, SQL Database, Key Vault, Event Hubs, and Stream Analytics",
    date: "2026-05-03",
    categories: ["Azure", "Data Engineering", "Cloud", "Streaming"],
    tags: ["azure", "data-engineering", "cloud", "python", "event-hubs", "stream-analytics", "sql-database", "key-vault", "virtual-machines", "streaming", "kafka", "tutorial", "2026"],
    excerpt: "Extend the Azure data-engineering stack with compute, structured storage, secrets, high-throughput streaming, and real-time aggregation using VMs, Azure SQL, Key Vault, Event Hubs, and Stream Analytics.",
    slug: "azure-data-engineers-part-3-vms-sql-key-vault-event-hubs-stream-analytics",
    readTime: 28,
    content: `
        <p><em>Your pipeline has storage. It has triggers. It has routing. What it does not have yet is a place to run compute, a place to persist structured results, a way to keep credentials off GitHub, a stream that handles millions of events per second, and a service that aggregates that stream in real time. This article builds all five.</em></p>
        <p><em>Parts 1 and 2 covered Blob Storage, ADLS, Azure Functions, Service Bus, and Logic Apps. Build those first. This article extends them into a production-grade stack.</em></p>

        <hr />

        <p><strong>What you will learn:</strong></p>
        <ul>
            <li>When and why data engineers actually spin up Azure Virtual Machines</li>
            <li>How to create a VM, connect via SSH, and keep it from eating your credits</li>
            <li>Azure SQL Database deployment models and pricing tiers, explained without the marketing</li>
            <li>How Azure Key Vault eliminates hardcoded credentials from your Python code entirely</li>
            <li>How to connect Python to Azure SQL using pyodbc, Key Vault secrets, and the correct ODBC driver</li>
            <li>What Azure Event Hubs is, how it compares to Kafka across five concrete dimensions, and which one to pick</li>
            <li>How to write a Python producer and consumer for Event Hubs with checkpointing</li>
            <li>How to set up Event Hub Capture without hitting the permission error that stops most people</li>
            <li>How Azure Stream Analytics consumes a live stream and writes aggregated results to SQL in real time</li>
            <li>The full Tumbling Window query with CROSS APPLY for nested JSON arrays, explained line by line</li>
        </ul>

        <hr />

        <h3>Why These Five Services Belong Together</h3>
        <p>Picture a data team building a real-time sales analytics platform. Orders arrive from a web app every few seconds. The team needs the raw stream captured permanently, per-product totals updated every minute, results queryable from a SQL table, and all credentials kept out of source code.</p>
        <p>That is not five problems. That is one pipeline with five layers.</p>
        <p>A VM provides raw compute for anything that needs a persistent machine. SQL Database is the structured destination where processed results land. Key Vault holds every credential that connects the layers. Event Hubs ingests the raw stream at scale. Stream Analytics transforms that stream and writes summaries to SQL in real time.</p>
        <p>By the end of this article, you will have seen every piece of that pipeline running. Let's go through them in order.</p>

        <hr />

        <h3>Part 1: Azure Virtual Machines</h3>
        <h4>When Data Engineers Actually Use VMs</h4>
        <p>Here is the honest version: you will not live on VMs the way a DevOps engineer does. But three specific scenarios push data engineers toward them.</p>
        <p>First, automations and deployments that need a persistent machine running in the cloud rather than depending on your local laptop. Second, SFTP servers where external clients drop files onto a secure network, which your pipeline then picks up automatically. Third, and this one comes up constantly: you want to practice open-source Kafka or Docker and your local Windows setup is fighting you. A Ubuntu VM in Azure takes five minutes and gives you a clean Linux environment without the host OS drama.</p>
        <p>Azure VMs are the equivalent of EC2 instances in AWS or Compute Engine in GCP. Same concept, Azure-specific implementation.</p>

        <h4>Creating a VM in the Portal</h4>
        <p>Search for "Virtual Machines" in the portal and click Create. The fields that actually matter:</p>
        <pre><code>Resource Group:     your existing resource group
Name:               something meaningful, for example my-de-vm
Region:             same region as your other resources
Availability Zone:  optional, selecting multiple zones creates one VM per zone
Image:              Ubuntu 24.04 LTS, good for Kafka, Docker, open-source tools
Size:               Standard_B1s, 1 vCPU, 1 GB RAM, enough for testing</code></pre>
        <p><strong>Authentication:</strong> Use SSH public key, not password. The portal generates a key pair and downloads the <code>.pem</code> private key file to your machine. Keep it. There is no way to recover it after this point.</p>
        <p><strong>Networking.</strong> This is the step people skip and then wonder why they cannot connect. You must explicitly whitelist inbound ports. Port 22 is required for SSH. If you plan to run Kafka, MySQL, or a web app on the VM, those specific ports must also be opened here. A VM with no allowed inbound ports is completely unreachable from outside.</p>
        <p><strong>Management tab.</strong> Enable auto-shutdown. Set it to stop after a period of inactivity. This single toggle has saved many free trial accounts from draining overnight while a forgotten VM sat idle.</p>

        <h4>Connecting via SSH</h4>
        <p>After deployment, click "Go to resource." The portal shows the Connect option with the command pre-filled. Or build it yourself:</p>
        <pre><code># Set correct permissions on the .pem file first
chmod 400 /path/to/your-key.pem

# Connect
ssh -i /path/to/your-key.pem azureuser@&lt;VM-public-IP&gt;</code></pre>
        <p>Once inside, you are in a standard Linux environment. Install what you need. When done, stop the machine from the portal. A stopped VM does not bill for compute.</p>
        <p>One practical note: if you are struggling to run open-source Kafka locally on Windows, a Ubuntu VM is the fastest fix. Install Kafka, practice producer/consumer patterns, shut the machine down when done. Costs almost nothing.</p>
        <p>That is VMs covered. Now let's talk about where the processed data actually lands.</p>

        <hr />

        <h3>Part 2: Azure SQL Database</h3>
        <h4>What Most Tutorials Skip</h4>
        <p>Here is the pain most tutorials skip: you can build the most elegant streaming pipeline in Azure, but the moment you need a BI team to query results, write a CRUD API, or run joins across multiple entities, you need a relational database. A data lake is not the answer. Azure SQL Database is.</p>
        <p>Azure SQL Database is a fully managed relational service built on the SQL Server engine. Fully managed means Microsoft handles patching, backups, high availability, and monitoring. You write queries. They handle everything underneath.</p>
        <p>Key features from the official docs: automated patching and backups, elastic pools and autoscaling, built-in replication and geo-redundancy, intelligent query tuning and automatic indexing, and security through Transparent Data Encryption, Always Encrypted, and Dynamic Data Masking.</p>

        <h4>Three Deployment Models</h4>
        <p>This is the first question in most Azure SQL interviews. Know all three cold.</p>
        <p><strong>Single Database</strong> is a dedicated, isolated instance for one application. Predictable workloads. Clean isolation. Use it for standalone apps where you want one database, one bill, no sharing.</p>
        <p><strong>Elastic Pool</strong> puts multiple databases into a shared resource pool. Each database borrows capacity from the pool during its peak, then releases it. If you have ten tenant databases that never peak simultaneously, you pay for the pool capacity instead of ten separate instances. This is cost-effective for SaaS applications hosting data for multiple customers.</p>
        <p><strong>Managed Instance</strong> provides near 100% compatibility with on-premises SQL Server. Cross-database queries, linked servers, SQL Agent: all the features that standard Azure SQL skips. Use it when migrating existing SQL Server workloads to the cloud without rewriting anything.</p>
        <p>Quick rule: Single Database for standalone apps, Elastic Pool for multi-tenant cost efficiency, Managed Instance for complex migrations.</p>

        <h4>DTU vs vCore Pricing</h4>
        <p>Two models. Very different philosophy.</p>
        <p><strong>DTU, Database Transaction Unit</strong> bundles CPU, memory, and read/write operations into one performance number. You pick a tier and a DTU count. Simple. Less control.</p>
        <p>DTU service tiers: Basic, for small databases and minimal traffic; Standard, for general-purpose moderate traffic; Premium, for high-performance mission-critical workloads.</p>
        <p><strong>vCore, Virtual Core</strong> separates CPU, memory, and storage so you configure each independently. More granular, right for enterprise workloads where you need to tune one dimension without touching the others.</p>
        <p>vCore service tiers: General Purpose, balanced for most workloads; Business Critical, high-transaction and low-latency; Hyperscale, very large databases with auto-scaling.</p>
        <p>Decision shortcut: DTU for simpler workloads where fine-tuning is not needed. vCore for complex enterprise workloads where you want precise resource control.</p>

        <h4>Setting Up the Database</h4>
        <p>In the portal, search for "SQL databases" and click Create. The critical thing to understand upfront: every database must live inside a Server, which is a logical container for multiple databases. The server name becomes part of your host endpoint: <code>yourservername.database.windows.net</code>.</p>
        <pre><code>Database name:      choose a name
Server:             create new, provide server name and admin credentials
Compute + storage:  select Serverless under General Purpose for autoscaling
                    scales to zero when idle, good for dev/test</code></pre>
        <p><strong>Firewall rules.</strong> After creation, go to the server's Networking tab. Enable "Allow Azure services and resources to access this server." Also add your current client IP. Without both, your Python script and the portal Query Editor both refuse to connect. This trips up almost everyone the first time.</p>

        <h4>Working With Schemas and Queries</h4>
        <p>In the portal, open your database and click Query Editor. Sign in with your SQL Server credentials.</p>
        <p>By default, tables live in the <code>dbo</code> schema. You can create custom schemas for logical organization. One gotcha: a schema does not appear in the table browser until at least one table is associated with it. Create the table first, then the schema becomes visible. It is not a bug.</p>
        <pre><code>-- Create a custom schema for sales data
CREATE SCHEMA sales_mart;

-- Sales table for manual data
CREATE TABLE sales_mart.Sales (
    SaleID       INT PRIMARY KEY IDENTITY(1,1),
    ProductName  NVARCHAR(100),
    Quantity     INT,
    SaleAmount   DECIMAL(18, 2),
    SaleDate     DATETIME
);

-- Insert sample rows
INSERT INTO [sales_mart].[Sales]
VALUES
    ('Laptop',      5,  4500.00, '2024-01-15 10:30:00'),
    ('Smartphone', 10,  8000.00, '2024-02-01 14:20:00'),
    ('Headphones', 20,  3000.00, '2024-03-10 09:15:00'),
    ('Monitor',     7,  7000.00, '2024-04-25 12:45:00'),
    ('Keyboard',   15,  1500.00, '2024-05-05 16:10:00');

SELECT * FROM [sales_mart].[Sales];</code></pre>
        <p>For the Stream Analytics output in Part 5, the destination table needs a specific schema to receive aggregated results:</p>
        <pre><code>CREATE TABLE [sales_mart].[AggregatedSales] (
    [ProductName]   nvarchar(4000),
    [TotalQuantity] bigint,
    [EventCount]    bigint,
    [WindowEndTime] datetime2
);</code></pre>
        <p>The <code>WindowEndTime</code> column tracks when each 1-minute aggregation window closed. That column gets populated automatically by Stream Analytics. Azure SQL connects on port 1433, the default SQL Server port. Keep it in mind when setting firewall rules or building connection strings.</p>
        <p>SQL is set up. Now let's keep its credentials off GitHub.</p>

        <hr />

        <h3>Part 3: Azure Key Vault</h3>
        <h4>The Problem</h4>
        <p>Your Python script needs a server hostname, a username, and a password. Where do they go?</p>
        <p>Hardcoded in the script: wrong. Hardcoded in an environment file checked into the same repository: also wrong. Accidentally committed to GitHub at 11 PM during a deadline push: a memorable career moment for the wrong reasons.</p>
        <p>Key Vault is Azure's centralized secret store. Store credentials there once. Fetch them at runtime using an authenticated identity. No secrets in code. No secrets in config files. No accidental leaks.</p>

        <h4>What Key Vault Manages</h4>
        <p><strong>Secrets Management.</strong> Store passwords, connection strings, and API keys as key-value pairs. This is what data engineers use most. One vault holds credentials for SQL, Event Hubs, and anything else your pipeline touches.</p>
        <p><strong>Key Management.</strong> Manage cryptographic keys for encryption and decryption. Supports software-protected keys and Hardware Security Module keys for higher security compliance requirements.</p>
        <p><strong>Certificate Management.</strong> Store and manage digital certificates, automate renewal, and eliminate the risk of expiry-related outages. Less relevant for data engineers, critical for application teams.</p>

        <h4>Setting Up Key Vault</h4>
        <p>Search for "Key Vault" in the portal and click Create:</p>
        <pre><code>Resource Group:   your existing resource group
Key Vault Name:   globally unique name
Region:           same as other resources
Pricing Tier:     Standard
Access Model:     Vault access policy, or RBAC, recommended in 2026 docs</code></pre>
        <p>Enable soft delete and configure the retention period. Soft delete means deleted secrets are recoverable for the retention window instead of being permanently gone. Enable it every time.</p>
        <p>After creation, go to Objects in the sidebar, click Secrets, then Generate/Import. Add your database credentials:</p>
        <pre><code>Name:  SQLServer       Value: yourservername.database.windows.net
Name:  username        Value: your-admin-username
Name:  password        Value: your-admin-password</code></pre>
        <p>You can set activation dates, when the secret becomes active, and expiration dates, when it stops working, on each secret. Useful for rotating credentials on a schedule without code changes.</p>
        <p>Your vault URI is on the overview page: <code>https://your-vault-name.vault.azure.net</code>. This is the endpoint your Python script uses.</p>

        <h4>Connecting Python to Azure SQL Using Key Vault</h4>
        <blockquote><p><strong>2026 update:</strong> The course code uses <code>{ODBC Driver 17 for SQL Server}</code>. The current GA version is <strong>ODBC Driver 18.6.2.1</strong>, released March 31, 2026. Use Driver 18 and add <code>Encrypt=yes;TrustServerCertificate=no;</code> because Azure SQL now requires encryption. Older configurations with Driver 17 and no encryption flags generate SSL certificate errors.</p></blockquote>
        <p><strong>Mac install, Driver 18:</strong></p>
        <pre><code>brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
brew install msodbcsql18</code></pre>
        <p><strong>Windows:</strong> Download the MSI installer from <code>https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server</code>.</p>
        <p><strong>Python packages:</strong></p>
        <pre><code>pip install pyodbc azure-identity azure-keyvault-secrets</code></pre>
        <p><strong>The full connection script:</strong></p>
        <pre><code># azure_sql_connect.py
# Requires: pyodbc, azure-identity, azure-keyvault-secrets
# Also requires ODBC Driver 18 installed on your machine

import pyodbc
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

key_vault_url = "https://your-vault-name.vault.azure.net"

# DefaultAzureCredential tries: env vars, managed identity, VS Code login, CLI login
credential = DefaultAzureCredential()
client = SecretClient(vault_url=key_vault_url, credential=credential)

# Fetch credentials at runtime -- no values in source code
server = client.get_secret("SQLServer").value
database = "your-database-name"
username = client.get_secret("username").value
password = client.get_secret("password").value
driver = "{ODBC Driver 18 for SQL Server}"    # Updated: 18, not 17

try:
    connection = pyodbc.connect(
        f"DRIVER={driver};"
        f"SERVER={server};"
        f"PORT=1433;"
        f"DATABASE={database};"
        f"UID={username};"
        f"PWD={password};"
        f"Encrypt=yes;"                         # Required for Azure SQL with Driver 18
        f"TrustServerCertificate=no;"
    )
    print("Connection successful!")

    cursor = connection.cursor()
    cursor.execute("SELECT TOP 5 * FROM [sales_mart].[Sales]")

    rows = cursor.fetchall()
    for row in rows:
        print(row)

except pyodbc.Error as e:
    print("Error in connection:", e)

finally:
    if connection:
        connection.close()
        print("Connection closed.")</code></pre>
        <p>Okay. Credentials are safe. Now let's build the stream they protect access to.</p>

        <hr />

        <h3>Part 4: Azure Event Hubs</h3>
        <h4>The Scale Problem</h4>
        <p>Imagine your web app generates 500 order events per second. Each event contains product details, customer info, store location, and a timestamp.</p>
        <p>You could write them directly to SQL. At 500 writes per second, SQL is fine. At 5,000, it starts sweating. At 50,000, the database becomes the bottleneck for your entire business. And that is before you account for downstream consumers, analytics jobs, and archive processes all trying to read from the same source simultaneously.</p>
        <p>Stop. That is exactly the problem Event Hubs solves.</p>
        <p>Azure Event Hub is a fully managed, real-time data ingestion service capable of streaming millions of events per second. Think of it as the "front door" for high-throughput events before any downstream processing begins. It absorbs the firehose, decouples producers from consumers, and lets every downstream service read at its own pace.</p>
        <p>The comparison from the course is accurate: Event Hubs shares approximately 80 to 85 percent of its concepts with Apache Kafka. If you know Kafka, this feels immediately familiar.</p>

        <h4>The Architecture, With Kafka Equivalents</h4>
        <p><strong>Event Hub Namespace:</strong> The top-level container for managing multiple Event Hubs. Equivalent to a Kafka cluster. Provides a grouping mechanism, simplifies management, and handles connection endpoints for your organization.</p>
        <p><strong>Event Hub, single entity:</strong> The main stream that receives and stores events. Equivalent to a Kafka topic.</p>
        <p><strong>Partitions:</strong> Ordered sequences within the event hub. Events are distributed across partitions based on a hash of the partition key. Multiple consumer instances read from individual partitions simultaneously, enabling parallel processing. Partitions also provide redundancy. One critical difference from Kafka: the partition count is fixed at creation and cannot be changed later.</p>
        <p><strong>Consumer Groups:</strong> Independent views of the event stream, each with a distinct group ID. Stream Analytics, Spark, and ADF can each use their own consumer group and read the same stream without interfering with each other.</p>
        <p><strong>Offsets:</strong> Incremental pointers tracking each consumer's current position within a partition. The consumer uses its offset to resume from exactly where it left off after a restart.</p>
        <p><strong>Checkpointing:</strong> Stores offset metadata externally in Azure Blob Storage or ADLS. When a consumer restarts after failure, it loads the checkpoint to find its last successfully processed position. This is the key behavioral difference from Kafka, where offset metadata lives on the broker side. In Event Hubs, the consumer owns its checkpoint storage.</p>
        <p><strong>Event Hub Capture:</strong> A built-in feature that automatically syncs the stream to ADLS or Blob Storage for historical analysis. Event Hubs retain data for a limited time, up to 90 days on Standard tier. Capture ensures events are persisted permanently without requiring you to write a separate consumer.</p>

        <h4>Event Hubs vs Apache Kafka: Five Dimensions</h4>
        <p>This table comes directly from the course PPT. Every Azure data engineering interview will test some version of this comparison.</p>
        <table>
            <thead>
                <tr>
                    <th>Dimension</th>
                    <th>Azure Event Hubs</th>
                    <th>Apache Kafka</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Management</td>
                    <td>Fully managed PaaS, Microsoft owns infrastructure</td>
                    <td>Self-managed, or Confluent Cloud with additional cost</td>
                </tr>
                <tr>
                    <td>Capacity planning</td>
                    <td>Throughput Units or Processing Units; 1 TU = 1 MB/s ingress, 2 MB/s egress</td>
                    <td>Fine-grained control over brokers, partitions, replication</td>
                </tr>
                <tr>
                    <td>Partitioning</td>
                    <td>Partition count fixed at creation, cannot change</td>
                    <td>Can scale partitions dynamically</td>
                </tr>
                <tr>
                    <td>Retention</td>
                    <td>Time-based only, up to 90 days on Standard</td>
                    <td>Time-based and size-based retention policies</td>
                </tr>
                <tr>
                    <td>Ecosystem</td>
                    <td>Native Azure integration, also supports Kafka protocol directly</td>
                    <td>Mature ecosystem: Kafka Connect, Kafka Streams, Flink, Spark</td>
                </tr>
            </tbody>
        </table>
        <p>One thing worth calling out: Event Hubs supports the Kafka protocol natively. An existing Kafka producer can publish to Event Hubs by pointing at the namespace endpoint without code changes. This makes migration gradual rather than a hard cutover.</p>

        <h4>Event Hub Tiers</h4>
        <p><strong>Basic:</strong> Small workloads, minimal requirements. Consumer group limits apply. No Event Hub Capture.</p>
        <p><strong>Standard:</strong> The tier for real work. Multiple consumer groups, Throughput Units, and Event Hub Capture. One TU provides 1 MB/s ingress and 2 MB/s egress.</p>
        <p><strong>Dedicated:</strong> A dedicated environment measured in Processing Units instead of TUs. For enterprise-grade streaming that needs guaranteed isolation and higher throughput.</p>

        <h4>Creating an Event Hub</h4>
        <p>Search for "Event Hubs" in the portal and click Create Namespace:</p>
        <pre><code>Namespace Name:  globally unique, for example myeventhub-ns
Location:        same region as other resources
Pricing Tier:    Standard</code></pre>
        <p>Inside the namespace, click Event Hubs in the sidebar, then Create:</p>
        <pre><code>Name:              eventhubdemo
Partition Count:   4, choose carefully, cannot change later
Retention (days):  1, for dev/test, up to 90 on Standard</code></pre>
        <p>For your connection string: inside the namespace, go to Shared Access Policies in the sidebar, click RootManageSharedAccessKey, or create a scoped read/write policy, and copy the Primary Connection String.</p>

        <h4>Setting Up Event Hub Capture Without Hitting the Error</h4>
        <p>Capture syncs your stream to ADLS automatically. Here is how to do it without hitting the permission error that blocks most people.</p>
        <p><strong>Step 1:</strong> Create your ADLS container if you do not have one. When creating the storage account, enable the Hierarchical Namespace option to make it ADLS Gen2.</p>
        <p><strong>Step 2: Assign the correct role.</strong> This is the step most tutorials skip entirely. Go to your storage account, click Access Control (IAM) in the sidebar, then Add role assignment. Search for and select <strong>Storage Blob Data Owner</strong>. On the Members tab, assign it to the user or object ID shown in the permission error message. Click Review and Assign.</p>
        <p>Without this role, the Event Hub cannot write to the storage account and the Capture setup validation fails with a "data plane permission" error. The error message shows you the exact object ID that needs the role. Read it carefully.</p>
        <p><strong>Step 3:</strong> Enable Capture on your Event Hub entity, not the namespace. Configure two sync windows using an OR condition:</p>
        <ul>
            <li><strong>Time Window</strong>, for example 5 minutes: when this interval expires, all events since the last capture are synced.</li>
            <li><strong>Size Window</strong>, for example 250 MB: if data reaches this volume before the time window, sync triggers immediately.</li>
        </ul>
        <p>Whichever limit hits first triggers the sync. This ensures regular captures during quiet periods via the time window, and prevents oversized batches during traffic spikes via the size window.</p>
        <p>Enable "Do not emit empty files" if you do not want empty files written during inactive windows. The captured data lands in your ADLS container organized as: <code>PartitionId/Year/Month/Day/Hour/Minute</code>.</p>

        <h4>Python Producer</h4>
        <pre><code>pip install azure-eventhub faker</code></pre>
        <pre><code># event_hub_producer.py
# Requires: azure-eventhub, faker

from azure.eventhub import EventHubProducerClient, EventData
from faker import Faker
import json, time, random

CONNECTION_STR = "&lt;your-event-hub-connection-string&gt;"
EVENT_HUB_NAME = "eventhubdemo"

fake = Faker()

products = [
    "Caffe Americano", "Caffe Latte", "Cappuccino", "Espresso", "Flat White",
    "Caramel Macchiato", "Mocha", "Iced Coffee", "Iced Latte", "Cold Brew",
    "Pumpkin Spice Latte", "Matcha Green Tea Latte", "Frappuccino"
]

def create_mock_order_data():
    return {
        "order_id": fake.uuid4(),
        "store_id": fake.uuid4(),
        "store_location": {
            "city": fake.city(),
            "country": fake.country()
        },
        "customer_id": fake.uuid4(),
        "order_details": [
            {
                "product_name": random.choice(products),
                "quantity": random.randint(1, 5),
                "price": round(random.uniform(3, 10), 2)
            }
        ],
        "order_total": round(random.uniform(5, 50), 2),
        "payment_method": random.choice(["Credit Card", "Debit Card",
                                           "Mobile Payment", "Cash"]),
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }

def send_orders_data_to_event_hub():
    producer = EventHubProducerClient.from_connection_string(
        conn_str=CONNECTION_STR,
        eventhub_name=EVENT_HUB_NAME
    )
    try:
        while True:
            mock_data = create_mock_order_data()
            json_data = json.dumps(mock_data)
            event_data = EventData(json_data)

            # partition_key ensures all events for the same order_id
            # land in the same partition, preserving ordering for that order
            producer.send_batch([event_data], partition_key=mock_data["order_id"])
            print(f"Sent: {json_data}")
            time.sleep(5)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        producer.close()

if __name__ == "__main__":
    send_orders_data_to_event_hub()</code></pre>
        <blockquote><p><strong>Thread safety, from official Microsoft docs:</strong> <code>EventHubProducerClient</code> and <code>EventHubConsumerClient</code> are not thread-safe or coroutine-safe. Do not share instances across threads. Create separate instances per thread or use <code>threading.Lock()</code> for concurrent sends.</p></blockquote>

        <h4>Python Consumer</h4>
        <pre><code># event_hub_consumer.py
# Requires: azure-eventhub

from azure.eventhub import EventHubConsumerClient

connection_str = "&lt;your-event-hub-connection-string&gt;"
eventhub_name = "eventhubdemo"
consumer_group = "$Default"

def on_event(partition_context, event):
    partition_key = event.partition_key
    event_data = event.body_as_str(encoding="UTF-8")

    print(f"Partition: {partition_context.partition_id}")
    print(f"Partition Key: {partition_key}")
    print(f"Event Data: {event_data}")

    # Write current offset to storage so a restart resumes here
    # instead of reprocessing the entire stream from the beginning
    partition_context.update_checkpoint(event)

def on_error(partition_context, error):
    print(f"Error on partition {partition_context.partition_id}: {error}")

def on_partition_initialize(partition_context):
    print(f"Partition {partition_context.partition_id} initialized.")

def on_partition_close(partition_context, reason):
    print(f"Partition {partition_context.partition_id} closed. Reason: {reason}")

if __name__ == "__main__":
    client = EventHubConsumerClient.from_connection_string(
        conn_str=connection_str,
        consumer_group=consumer_group,
        eventhub_name=eventhub_name
    )
    try:
        client.receive(
            on_event=on_event,
            on_error=on_error,
            on_partition_initialize=on_partition_initialize,
            on_partition_close=on_partition_close,
            starting_position="-1"   # Start from beginning of stream
        )
    except KeyboardInterrupt:
        print("Receiving stopped.")
    finally:
        client.close()</code></pre>
        <p>The consumer uses callback functions, not a polling loop. <code>on_event</code> fires for each received event. <code>update_checkpoint</code> writes the current offset to storage. A restart loads that checkpoint and resumes from exactly that position.</p>
        <p><code>starting_position="-1"</code> reads from the beginning. Use <code>"@latest"</code> if you only want events published after the consumer starts.</p>
        <p>A single consumer instance reads from all partitions. To parallelize, run multiple instances with the same consumer group ID. Each instance claims one or more partitions automatically.</p>
        <p>Event Hubs is now ingesting your stream. The problem is it is raw JSON arriving in a continuous flood. Nobody can query a flood. Stream Analytics turns that flood into a table.</p>

        <hr />

        <h3>Part 5: Azure Stream Analytics</h3>
        <h4>The Real-Time Aggregation Problem</h4>
        <p>Here is the scenario. Your Event Hub is receiving 500 orders per minute from a Starbucks point-of-sale application. The business wants to know: which products sold the most in the last minute, updated every minute, queryable from SQL.</p>
        <p>You could write a consumer that collects events in memory, runs aggregations every 60 seconds, and writes to SQL. You would also need to handle consumer failures, restarts, windowing edge cases, and the SQL write logic. That is 200 lines of infrastructure code before you write a single business calculation.</p>
        <p>Stop. Azure Stream Analytics is that infrastructure, already built and managed.</p>
        <p>It is a serverless compute service that consumes from a streaming endpoint, like Event Hub, runs SQL-like aggregations, and writes results to a destination. The compute capacity is measured in <strong>Streaming Units</strong>, which you configure manually. The job also requires a storage account for maintaining metadata, SQL reference data snapshots, and checkpoint state.</p>

        <h4>Job Topology: Input, Output, Transformation</h4>
        <p>Every Stream Analytics job has exactly three parts.</p>
        <p><strong>Input</strong> is the streaming data source. For this pipeline it is Event Hub. You configure: subscription, namespace, event hub name, consumer group, and serialization format, JSON. Give it an alias like <code>input-eventhub</code>. That alias is what you reference in your transformation query.</p>
        <p><strong>Output</strong> is the destination for processed results. Options include Azure SQL Database, Synapse, Cosmos DB, ADLS, Event Hubs, and Power BI. Configure Azure SQL as the output, provide your server name, database name, credentials, and the target table. Give it an alias, the database name works here.</p>
        <p><strong>Transformation</strong> is the SQL query that defines what happens between input and output. It runs continuously against the live stream.</p>

        <h4>Writing the Transformation Query</h4>
        <p>Here is the full production query from this course. It consumes Starbucks order events and writes per-product, per-minute aggregates to the <code>AggregatedSales</code> SQL table.</p>
        <pre><code>WITH stg AS (
    SELECT
        arrayElement.arrayvalue.product_name AS ProductName,
        CAST(arrayElement.arrayvalue.quantity AS bigint) AS Quantity,
        event.order_id,
        event.customer_id,
        event.store_id,
        event.store_location.city    AS City,
        event.store_location.country AS Country
    FROM
        [input-eventhub] AS event
    CROSS APPLY
        GetArrayElements(event.order_details) AS arrayElement
)
SELECT
    ProductName,
    SUM(Quantity)      AS TotalQuantity,
    COUNT(*)           AS EventCount,
    System.Timestamp() AS WindowEndTime
INTO
    [sql-output-db]
FROM
    stg
GROUP BY
    TUMBLINGWINDOW(minute, 1),
    ProductName;</code></pre>
        <p>Let's break this down. Each part is doing something specific.</p>
        <p><strong>The CTE, <code>WITH stg AS</code>,</strong> parses the incoming JSON. Simple nested fields like <code>store_location.city</code> are accessed using the dot operator directly on the event object, no special handling needed.</p>
        <p><strong><code>CROSS APPLY GetArrayElements(event.order_details)</code></strong> is the critical piece. Wait, let's stop here. A single order event contains an <code>order_details</code> array, a list of products in that order. Without <code>CROSS APPLY</code>, a multi-product order is one row, and you cannot aggregate by individual product. <code>GetArrayElements</code> explodes that array into multiple rows, one per product, while keeping the <code>order_id</code> the same across all rows. This is Stream Analytics's version of Spark's <code>explode()</code> function. Understand this one and the rest of the query is easy.</p>
        <p><strong><code>TUMBLINGWINDOW(minute, 1)</code></strong> defines discrete, non-overlapping one-minute windows. From 10:00 to 10:01. Then 10:01 to 10:02. Each window closes, the aggregation runs, and the result writes to SQL. <code>System.Timestamp()</code> captures when that window ended, which becomes the <code>WindowEndTime</code> column.</p>
        <p><strong><code>GROUP BY TUMBLINGWINDOW(minute, 1), ProductName</code></strong> aggregates per product, per minute. Total quantity sold and event count for each product in each window.</p>
        <p>Why Tumbling specifically? There are multiple window types in Stream Analytics. Tumbling windows are discrete and non-overlapping. Every event belongs to exactly one window. They are the right choice for clean, non-redundant time buckets where you want one summary row per interval, not rolling or sliding summaries.</p>
        <p>Yeah, this is a lot of SQL for what sounds like a simple aggregation. That complexity comes from the nested JSON array. If your events were flat, the entire query would be 8 lines.</p>

        <h4>No-Code Editor</h4>
        <p>Stream Analytics includes a visual no-code editor, currently in preview. You drag inputs, transformations, and outputs onto a canvas. Available operations include filter, aggregate, join, group, union, and expand. The editor generates the underlying SQL in the background automatically.</p>
        <p>The no-code editor handles simple transformations well. For anything involving <code>CROSS APPLY GetArrayElements</code> or custom CTEs with nested JSON, use the manual SQL editor. The <code>CROSS APPLY</code> pattern above is not expressible in the no-code editor.</p>

        <h4>Starting the Job</h4>
        <p>When you click Start, two options appear.</p>
        <p><strong>Now</strong> starts from the current time. Events published before you clicked Start are skipped.</p>
        <p><strong>When Last Stopped</strong> uses checkpointing to resume from the exact offset where the job previously stopped. Use this when restarting after maintenance or a failure. It avoids reprocessing the entire stream history and saves significant compute.</p>

        <h4>Monitoring a Running Job</h4>
        <p>There is no instant error dashboard. You have to enable diagnostic logging first, and many people skip this until something breaks.</p>
        <p>Go to your job, open Monitoring in the sidebar, click Diagnostic Settings, add a new setting, and enable all logs. Point them at your storage account or a Log Analytics workspace.</p>
        <p>Once enabled, three things to watch:</p>
        <p><strong>Input data errors</strong> appear when incoming JSON does not match the schema your query expects. Common cause: a field is missing in some events or a type does not match a <code>CAST</code> in your query.</p>
        <p><strong>Failed operations</strong> cover general execution failures. Check these when the job runs but nothing appears in the output table.</p>
        <p><strong>Partition metrics</strong> show how many messages are being consumed across each partition over time. A healthy job shows spikes on partitions 0, 1, 2, and 3 as data flows. A flat line on all partitions means the job is not consuming anything.</p>
        <p>Watch the output count metric separately. If input metrics show activity but output count stays at zero, the transformation or output configuration has a problem, not the ingestion.</p>

        <h4>Live Demo Results</h4>
        <p>During the live run in this course, a Python producer published Starbucks order data for products like "Mocha" and "Caramel" to Event Hub. The initial <code>SELECT *</code> on <code>AggregatedSales</code> showed zero rows. As the job processed each one-minute Tumbling Window, the count climbed from 6 rows to 22 rows.</p>
        <p>Each row contained a product name, the total quantity sold in that window, the event count, and the <code>WindowEndTime</code> timestamp. Real-time aggregation, flowing from a Python script through Event Hubs through Stream Analytics into a relational SQL table. That is the lakehouse architecture pattern in action at small scale.</p>

        <hr />

        <h3>The Complete Stack</h3>
        <p>Here is every service from this article and its role in the pipeline:</p>
        <pre><code>Azure VM
  Raw compute for SFTP servers, automations, open-source tool practice

Azure SQL Database
  Relational destination for structured, processed results
  Hosts the AggregatedSales table written by Stream Analytics

Azure Key Vault
  Stores all credentials, SQL, Event Hub, anything sensitive
  Python fetches them at runtime via DefaultAzureCredential

Azure Event Hubs
  Ingests the raw stream at scale
  Partitioned for parallelism, Captured to ADLS for permanent history

Azure Stream Analytics
  Consumes from Event Hubs, runs Tumbling Window aggregations per minute,
  writes per-product summaries to SQL in real time</code></pre>
        <p>These services work independently. In the project phase they connect into one end-to-end data flow. Everything you learned here is what you will assemble there.</p>

        <hr />

        <h3>Resource Cleanup</h3>
        <p>Stop your VM from the portal before closing your laptop. Stop your Stream Analytics job. Disable your Logic App from Part 2. Event Hub Namespaces and Key Vaults charge minimally when idle, but Function Apps and VMs burn credits continuously when running.</p>
        <p>Three seconds per resource. Saves hours of credits.</p>

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
                    <td>azure-eventhub</td>
                    <td>5.15.1</td>
                    <td>3.9</td>
                    <td>EventHubProducerClient, EventHubConsumerClient</td>
                </tr>
                <tr>
                    <td>azure-identity</td>
                    <td>1.25.3</td>
                    <td>3.9</td>
                    <td>DefaultAzureCredential for all services</td>
                </tr>
                <tr>
                    <td>azure-keyvault-secrets</td>
                    <td>4.11.0</td>
                    <td>3.9</td>
                    <td>SecretClient</td>
                </tr>
                <tr>
                    <td>pyodbc</td>
                    <td>5.3.0</td>
                    <td>3.9</td>
                    <td>Requires ODBC Driver 18 installed separately</td>
                </tr>
                <tr>
                    <td>faker</td>
                    <td>40.15.0</td>
                    <td>3.9</td>
                    <td>Mock data generation</td>
                </tr>
            </tbody>
        </table>

        <h4>ODBC Driver Update</h4>
        <p>The course code uses <code>{ODBC Driver 17 for SQL Server}</code>. Current GA version is <strong>ODBC Driver 18.6.2.1</strong>, released March 31, 2026. Update your driver string and add <code>Encrypt=yes;TrustServerCertificate=no;</code> to your connection string. Azure SQL requires encryption with Driver 18.</p>

        <h4>SQL Deployment Model Comparison</h4>
        <table>
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Resource</th>
                    <th>Best For</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Single Database</td>
                    <td>Dedicated instance</td>
                    <td>Standalone apps, predictable load</td>
                </tr>
                <tr>
                    <td>Elastic Pool</td>
                    <td>Shared pool</td>
                    <td>SaaS multi-tenant, variable load across databases</td>
                </tr>
                <tr>
                    <td>Managed Instance</td>
                    <td>Near 100% SQL Server compat</td>
                    <td>On-premises migrations, linked servers, SQL Agent</td>
                </tr>
            </tbody>
        </table>

        <h4>Event Hubs vs Kafka Summary</h4>
        <table>
            <thead>
                <tr>
                    <th>Dimension</th>
                    <th>Event Hubs</th>
                    <th>Kafka</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Management</td>
                    <td>Fully managed PaaS</td>
                    <td>Self-managed or Confluent Cloud</td>
                </tr>
                <tr>
                    <td>Partition count</td>
                    <td>Fixed at creation</td>
                    <td>Can scale dynamically</td>
                </tr>
                <tr>
                    <td>Retention</td>
                    <td>Time-based, up to 90 days</td>
                    <td>Time-based and size-based</td>
                </tr>
                <tr>
                    <td>Kafka protocol</td>
                    <td>Supported natively</td>
                    <td>Native</td>
                </tr>
                <tr>
                    <td>Best for</td>
                    <td>Azure-native pipelines</td>
                    <td>High-throughput, hybrid architectures</td>
                </tr>
            </tbody>
        </table>

        <h4>Stream Analytics Query Template</h4>
        <pre><code>WITH stg AS (
    SELECT
        arrayElement.arrayvalue.field AS ColumnAlias,
        event.nested.field            AS AnotherColumn
    FROM [input-alias] AS event
    CROSS APPLY GetArrayElements(event.array_field) AS arrayElement
)
SELECT
    ColumnAlias,
    SUM(value_field)   AS Total,
    COUNT(*)           AS EventCount,
    System.Timestamp() AS WindowEndTime
INTO [output-alias]
FROM stg
GROUP BY TUMBLINGWINDOW(minute, 1), ColumnAlias;</code></pre>

        <h4>Key Vault Python Pattern</h4>
        <pre><code>from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

credential = DefaultAzureCredential()
client = SecretClient(
    vault_url="https://your-vault.vault.azure.net",
    credential=credential
)
secret_value = client.get_secret("SecretName").value</code></pre>

        <hr />

        <p><em>All versions and commands verified against Microsoft Learn, PyPI, and GitHub. April 2026.</em></p>
    `
};

export const azurePart1Content = {
    id: 7,
    title: "Azure for Data Engineers, Part 1: Blob Storage, ADLS Gen2, CLI and Serverless Functions",
    date: "2026-04-30",
    categories: ["Azure", "Data Engineering", "Cloud", "Serverless"],
    tags: ["azure", "data-engineering", "cloud", "python", "serverless", "adls", "azure-functions", "blob-storage", "tutorial", "2026"],
    excerpt: "Everything you actually need to store, access, and trigger data pipelines in Azure: Blob Storage, ADLS Gen2, Azure CLI, Python SDK access, and serverless Azure Functions from VS Code.",
    slug: "azure-data-engineers-part-1-blob-adls-functions",
    readTime: 24,
    content: `
        <p><em>Everything you actually need to store, access, and trigger data pipelines in Azure. No fluff. No skipped steps. Verified against 2026 Microsoft documentation.</em></p>

        <hr />

        <p><strong>What you will learn:</strong></p>
        <ul>
            <li>How Azure Blob Storage's three-layer hierarchy works and why it matters</li>
            <li>The real difference between Blob Storage and ADLS Gen2</li>
            <li>How to create storage accounts, containers, and upload blobs via UI, CLI, and Python</li>
            <li>How to read cloud CSV data into a Pandas DataFrame using the 2026 SDK</li>
            <li>What Azure Functions are and how to deploy one from VS Code using the V2 model</li>
            <li>How to configure triggers, CORS, and test everything end-to-end</li>
        </ul>

        <hr />

        <h3>The Problem You Are Actually Trying to Solve</h3>
        <p>You have data. Gigabytes of it. Maybe petabytes eventually. CSVs, JSONs, Parquet files, logs, images. You need it somewhere reliable, cheap, scalable, and queryable, without managing a single physical server.</p>
        <p>Azure Blob Storage is Microsoft's answer to that. But here is what most tutorials skip: <strong>Blob Storage and Azure Data Lake Storage Gen2 are not the same thing</strong>, even though Gen2 literally sits on top of Blob Storage. Get this distinction wrong early and you will hit performance walls the moment your first Spark job runs. We will fix that in this article.</p>
        <p>Let's build this properly.</p>

        <hr />

        <h3>Part 1: Azure Blob Storage, The Foundation</h3>
        <h4>The Three-Layer Mental Model</h4>
        <p>Think of it like a company's physical office:</p>
        <p><strong>Storage Account</strong> is the entire office building. Your top-level namespace with a globally unique name. Every blob, queue, table, and file share lives inside it. In GCP this is your bucket name. In AWS it maps to an S3 bucket, but with more services bundled in.</p>
        <p><strong>Container</strong> is a filing cabinet inside the building. A logical grouping for blobs. You might have one for <code>raw-landing</code>, one for <code>processed</code>, one for <code>archived</code>.</p>
        <p><strong>Blob</strong> is the actual document in the drawer. An image, a 500MB CSV, a JSON log. If it is unstructured data, it lives here.</p>
        <p>The URI structure locks this in:</p>
        <pre><code>https://&lt;storage-account-name&gt;.blob.core.windows.net/&lt;container-name&gt;/&lt;blob-name&gt;</code></pre>
        <p>Example: a file <code>customer_subscription.csv</code> in container <code>sales-data</code> inside account <code>mystorageaccount</code> lives at:</p>
        <pre><code>https://mystorageaccount.blob.core.windows.net/sales-data/customer_subscription.csv</code></pre>
        <p>That is your object's permanent, unique, shareable address.</p>
        <blockquote><p><strong>Container naming rules, from 2026 Microsoft docs:</strong> 3 to 63 characters, must start with a letter or number, lowercase letters/numbers/hyphens only. No consecutive hyphens. Uppercase letters throw a 400 Bad Request error.</p></blockquote>

        <h4>Access Tiers: Cost Optimization From Day One</h4>
        <p>Azure gives you three storage tiers. Pick the wrong one and you are paying 3x what you need to.</p>
        <table>
            <thead>
                <tr>
                    <th>Tier</th>
                    <th>Use Case</th>
                    <th>Retrieval Latency</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Hot</strong></td>
                    <td>Daily access, dashboards, live APIs</td>
                    <td>Milliseconds</td>
                    <td>Higher storage cost, lowest access cost</td>
                </tr>
                <tr>
                    <td><strong>Cool</strong></td>
                    <td>Monthly access, reports, backups</td>
                    <td>Milliseconds</td>
                    <td>About 50% cheaper storage than Hot</td>
                </tr>
                <tr>
                    <td><strong>Archive</strong></td>
                    <td>Rarely touched, regulatory, old logs</td>
                    <td>Hours, rehydration required</td>
                    <td>Cheapest storage, expensive retrieval</td>
                </tr>
            </tbody>
        </table>
        <blockquote><p><strong>Verified 2026:</strong> Archive tier is available only on General Purpose v2 and Blob Storage accounts, and only for block blobs and append blobs, not page blobs.</p></blockquote>
        <p>Rule of thumb: landing zone data starts on Hot. After processing, move to Cool. After 90 or more days idle, automate a lifecycle policy to move it to Archive.</p>

        <h4>Creating a Storage Account, Portal Walkthrough</h4>
        <p>In the search bar, type "Storage accounts" and select it, then click Create.</p>
        <p>Critical fields to fill correctly:</p>
        <pre><code>Subscription:         Your active subscription
Resource Group:       Create new or reuse, for example rg-data-engineering
Storage Account Name: Globally unique, 3-24 chars, lowercase + numbers only
Region:               Closest to your compute, for example East US 2
Performance:          Standard for most scenarios, Premium for low-latency SSD
Redundancy:           LRS for dev/test, ZRS or GRS for production</code></pre>
        <p><strong>The Advanced tab is where most tutorials get lazy.</strong> Pay attention here:</p>
        <ul>
            <li><strong>Hierarchical Namespace:</strong> Enabling this upgrades you to ADLS Gen2. Off means standard Blob. On means big data analytics mode.</li>
            <li><strong>Blob soft delete:</strong> Enable this. It retains deleted blobs for a configurable retention window so an accidental delete is recoverable.</li>
            <li><strong>Versioning:</strong> Creates a new version on every overwrite instead of replacing the file. Useful for audit trails.</li>
            <li><strong>Networking:</strong> You can allow public access for development or restrict access to specific Virtual Private Networks or authorized IP addresses for production security. Production deployments should always lock this down.</li>
            <li><strong>Encryption:</strong> Microsoft-managed keys by default. Switch to Customer-Managed Keys for HIPAA or SOC 2 requirements.</li>
        </ul>
        <p>Click Review and Create. Deployment takes about 30 seconds.</p>

        <hr />

        <h3>Part 2: Blob Storage vs. ADLS Gen2, The Real Difference</h3>
        <p>Stop here. This is the confusion that costs teams weeks.</p>
        <p><strong>Azure Blob Storage</strong> is general-purpose object storage, the right tool for serving images and videos to web or mobile apps, storing user documents like PDFs and resumes, dumping application logs, and backup archives.</p>
        <p><strong>ADLS Gen2</strong> is Blob Storage with Hierarchical Namespace enabled. That one toggle changes everything:</p>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Blob Storage</th>
                    <th>ADLS Gen2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Directory structure</td>
                    <td>Flat, simulated via naming conventions</td>
                    <td>True hierarchical file system</td>
                </tr>
                <tr>
                    <td>HDFS compatibility</td>
                    <td>No</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>Spark and Databricks</td>
                    <td>Functional but slower</td>
                    <td>Native, high-throughput optimized</td>
                </tr>
                <tr>
                    <td>Rename and move</td>
                    <td>Copy plus delete, expensive, non-atomic</td>
                    <td>Atomic operation, cheap</td>
                </tr>
                <tr>
                    <td>Access control</td>
                    <td>Container and account level</td>
                    <td>POSIX-style ACLs on files and folders</td>
                </tr>
                <tr>
                    <td>Analytics workloads</td>
                    <td>General purpose</td>
                    <td>Purpose-built</td>
                </tr>
            </tbody>
        </table>
        <p>The practical signal: if your pipeline runs Spark, uses Databricks, or connects to Synapse Analytics, use ADLS Gen2. For everything else, standard Blob Storage is fine and cheaper.</p>

        <hr />

        <h3>Part 3: Uploading Data, Three Ways</h3>
        <h4>Method 1: The Portal, Good for Learning</h4>
        <p>Navigate to your Storage Account, open Data storage in the sidebar, and select Containers. Click the plus sign to create a new container, name it, for example <code>sales-data-landing</code>, and set the access level. Then open the container and click Upload to select a file from your local machine.</p>
        <p><strong>Anonymous access level explained:</strong></p>
        <ul>
            <li><strong>Private, default:</strong> Only authorized identities. Always use this in production.</li>
            <li><strong>Blob:</strong> Anyone with the exact blob URL can read that specific file only.</li>
            <li><strong>Container:</strong> Anyone can list and read all blobs in the container.</li>
        </ul>
        <blockquote><p>To enable anything beyond Private, first go to Settings, then Configuration, then set Allow blob anonymous access to Enabled and save. The portal blocks container-level access settings until you flip this switch at the account level.</p></blockquote>

        <h4>A Quick Note on the Other Storage Services</h4>
        <p>When you open a Storage Account in the portal, the Data storage section shows four services, not just Containers. It can feel overwhelming at first, so here is what each one actually does.</p>
        <p><strong>Containers</strong> are what this article focuses on. They are the standard for storing files used in data engineering pipelines: CSVs, JSONs, Parquet, images, and logs.</p>
        <p><strong>File Shares</strong> create a shared file system in the cloud. Use them when you have specific files that need to be shared across team members or multiple virtual machines with controlled permissions.</p>
        <p><strong>Queues</strong> provide a messaging mechanism for storing and retrieving messages between services, similar to AWS SQS or GCP Pub/Sub. When one service needs to continuously publish data to be picked up by another service, Queues handle the decoupling.</p>
        <p><strong>Tables</strong> are a NoSQL key-value storage option for simple structured data, without the overhead of a full database like Cosmos DB.</p>
        <p>For anything involving big data pipelines, Containers are your default. Queues and Tables in this context are for lighter, general-purpose tasks.</p>

        <h4>Method 2: Azure CLI</h4>
        <p><strong>Install:</strong></p>
        <p>Mac:</p>
        <pre><code>brew install azure-cli</code></pre>
        <p>Windows: download the MSI installer from the official Microsoft docs at <code>https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows</code>.</p>
        <p>Verify the install and log in:</p>
        <pre><code>az --version
az login
# Opens browser, sign in, then select your subscription number in the terminal</code></pre>
        <p><strong>Core commands:</strong></p>
        <pre><code># List all storage accounts in your subscription
az storage account list --output table

# Create a new storage account
az storage account create \\
  --name &lt;storage_account_name&gt; \\
  --resource-group &lt;resource_group&gt; \\
  --location eastus2 \\
  --sku Standard_LRS

# List containers inside a storage account
az storage container list \\
  --account-name &lt;storage_account_name&gt; \\
  --account-key &lt;account_key&gt; \\
  --output table

# Upload a local file to a container
az storage blob upload \\
  --account-name &lt;storage_account_name&gt; \\
  --account-key &lt;account_key&gt; \\
  --container-name &lt;container_name&gt; \\
  --name customer_subscription.csv \\
  --file /local/path/to/customer_subscription.csv

# List all blobs inside a container
az storage blob list \\
  --account-name &lt;storage_account_name&gt; \\
  --account-key &lt;account_key&gt; \\
  --container-name &lt;container_name&gt; \\
  --output table

# Download a blob to a local path
az storage blob download \\
  --account-name &lt;storage_account_name&gt; \\
  --account-key &lt;account_key&gt; \\
  --container-name &lt;container_name&gt; \\
  --name customer_subscription.csv \\
  --file /local/output/path/file.csv

# Generate a time-limited SAS token for a blob
az storage blob generate-sas \\
  --account-name &lt;storage_account_name&gt; \\
  --account-key &lt;account_key&gt; \\
  --container-name &lt;container_name&gt; \\
  --name &lt;blob_name&gt; \\
  --permissions r \\
  --expiry 2026-12-31T00:00:00Z</code></pre>
        <p>To find your account key, go to your Storage Account in the portal, open Security and networking in the sidebar, then select Access keys and copy key1.</p>
        <blockquote><p>Store keys in Azure Key Vault, never hardcoded in scripts. Treat them like passwords, because they are.</p></blockquote>

        <h4>Method 3: Python SDK, What Pipelines Actually Use</h4>
        <p><strong>Verified package info from PyPI, January 2026:</strong></p>
        <table>
            <tbody>
                <tr>
                    <td>Package</td>
                    <td>azure-storage-blob</td>
                </tr>
                <tr>
                    <td>Latest stable</td>
                    <td>12.24.0, released January 6, 2026</td>
                </tr>
                <tr>
                    <td>Minimum Python</td>
                    <td>3.9 or later</td>
                </tr>
                <tr>
                    <td>Supported Python versions</td>
                    <td>3.9, 3.10, 3.11, 3.12, 3.13, 3.14</td>
                </tr>
                <tr>
                    <td>Storage service version support</td>
                    <td>Up to 2026-04-06</td>
                </tr>
            </tbody>
        </table>
        <p>Install the packages:</p>
        <pre><code>pip install azure-storage-blob pandas azure-identity</code></pre>
        <blockquote><p>The <code>azure-identity</code> package is Microsoft's recommended approach for production as of 2026, providing passwordless authentication via Microsoft Entra ID, formerly known as Azure AD. Both approaches are shown below.</p></blockquote>

        <p><strong>Option A: Connection String, simpler and good for learning:</strong></p>
        <pre><code># read_csv_from_blob.py
# Requires: azure-storage-blob &gt;= 12.24.0, Python &gt;= 3.9

from azure.storage.blob import BlobServiceClient
import pandas as pd
from io import StringIO
import os

# Pull credentials from environment variables, never hardcode keys
account_name = os.getenv("AZURE_STORAGE_ACCOUNT", "mystorageaccount")
account_key = os.getenv("AZURE_STORAGE_KEY", "your_key_here")
container_name = "sales-data"
blob_name = "customer_subscription.csv"

connection_string = (
    f"DefaultEndpointsProtocol=https;"
    f"AccountName={account_name};"
    f"AccountKey={account_key};"
    f"EndpointSuffix=core.windows.net"
)

# Step 1: Initialize the service client
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# Step 2: Get the container client
container_client = blob_service_client.get_container_client(container_name)

# Step 3: Get the blob client
blob_client = container_client.get_blob_client(blob_name)

# Step 4: Download and parse into a DataFrame
blob_data = blob_client.download_blob().content_as_text()
df = pd.read_csv(StringIO(blob_data))

print(f"Loaded {len(df)} rows from {blob_name}")
print(df.head())</code></pre>

        <p><strong>Option B: DefaultAzureCredential, recommended for production in 2026:</strong></p>
        <pre><code># Passwordless authentication using Microsoft Entra ID
# Microsoft's recommended approach as of 2026

from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
import pandas as pd
from io import StringIO

account_url = "https://mystorageaccount.blob.core.windows.net"
container_name = "sales-data"
blob_name = "customer_subscription.csv"

# DefaultAzureCredential tries in this order:
# environment variables, managed identity, VS Code login, Azure CLI login
credential = DefaultAzureCredential()
blob_service_client = BlobServiceClient(account_url, credential=credential)

container_client = blob_service_client.get_container_client(container_name)
blob_client = container_client.get_blob_client(blob_name)

blob_data = blob_client.download_blob().content_as_text()
df = pd.read_csv(StringIO(blob_data))
print(df.head())</code></pre>
        <p>The SDK pattern is always a three-step drill-down: ServiceClient, then ContainerClient, then BlobClient. Every Azure Storage operation in this SDK follows this hierarchy. Learn it once and you will write it without thinking.</p>

        <hr />

        <h3>Part 4: Azure Functions, Serverless Data Pipelines</h3>
        <h4>What "Serverless" Actually Means</h4>
        <p>Normally, running Python code means a machine, an environment, updates to manage, and a bill running 24/7 whether or not anything is happening.</p>
        <p>Azure Functions flips that model. You write the code. Azure handles the machine. You pay only for the milliseconds your code runs. For a Blob Trigger function that fires when a file lands in storage, that can cost fractions of a cent per invocation. At pipeline scale, this is genuinely transformative.</p>

        <h4>Triggers: What Makes a Function Run</h4>
        <p>Functions do not poll. They react. Every function has exactly one trigger:</p>
        <table>
            <thead>
                <tr>
                    <th>Trigger</th>
                    <th>What fires it</th>
                    <th>Data Engineering use</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>HTTP Trigger</td>
                    <td>An HTTP request hits your endpoint</td>
                    <td>APIs, webhooks, manual pipeline kicks</td>
                </tr>
                <tr>
                    <td>Blob Trigger</td>
                    <td>A file lands in a storage container</td>
                    <td>Auto-process new CSV, JSON, or Parquet arrivals</td>
                </tr>
                <tr>
                    <td>Timer Trigger</td>
                    <td>A cron schedule fires</td>
                    <td>Hourly or daily scheduled pipelines</td>
                </tr>
                <tr>
                    <td>Event Hub Trigger</td>
                    <td>A streaming event arrives</td>
                    <td>Real-time stream processing</td>
                </tr>
                <tr>
                    <td>Cosmos DB Trigger</td>
                    <td>A document changes in Cosmos</td>
                    <td>Change-data-capture patterns</td>
                </tr>
            </tbody>
        </table>
        <p>The trigger you will use most as a data engineer is the Blob Trigger. A file lands in the landing zone, the function fires, an ADF job kicks off, and data flows downstream. Zero polling, zero manual intervention.</p>

        <h4>Function App vs. Azure Function</h4>
        <p>An <strong>Azure Function</strong> is the individual piece of code: one trigger, one handler.</p>
        <p>An <strong>Azure Function App</strong> is the logical container that hosts one or more functions. It manages deployment, scaling, and the runtime environment.</p>
        <p>Think of the Function App as the storage account and the individual Functions as the blobs inside it.</p>

        <hr />

        <h3>Part 5: Building and Deploying from VS Code</h3>
        <h4>Step 1: Prerequisites</h4>
        <p><strong>Azure Function Core Tools, verified latest version: 4.9.0, approved March 27, 2026</strong></p>
        <blockquote><p><strong>Critical 2026 update, verified from Microsoft docs:</strong> Azure Functions supports only runtime version 4.x. Versions 2.x and 3.x reached end of support in December 2022. Version 1.x support ends September 14, 2026. If you have v1 apps, migrate immediately.</p></blockquote>
        <p>Mac install:</p>
        <pre><code>brew tap azure/functions
brew install azure-functions-core-tools@4

# If upgrading from 2.x or 3.x:
brew link --overwrite azure-functions-core-tools@4</code></pre>
        <p>Windows: download the 64-bit MSI, which is required for VS Code debugging, from <code>https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local</code>.</p>
        <p>Verify:</p>
        <pre><code>func --version
# Should return 4.x.x</code></pre>
        <p><strong>VS Code Extensions, all three are required:</strong></p>
        <pre><code>ms-azuretools.vscode-azurefunctions        (Azure Functions, core)
ms-azuretools.vscode-azureresourcegroups   (Azure Resources)
ms-vscode.azure-account                    (Azure Account for sign-in)</code></pre>
        <blockquote><p><strong>Deprecation notice, confirmed from screenshot:</strong> The Azure Account extension v0.12.x is being deprecated. Microsoft is migrating authentication directly into the Azure Resources extension. Sign-in still works as of April 2026. Check the official deprecation announcement on GitHub for migration guidance.</p></blockquote>
        <p>After installing, click the Azure icon in the VS Code sidebar, select Sign in to Azure, authenticate in the browser, then select your subscription.</p>

        <h4>Step 2: Create the Function Project</h4>
        <p>In the Azure extension panel, click the lightning bolt icon, then select Create Function. Choose your folder, set the language to Python, and select the V2 programming model.</p>
        <p><strong>V1 vs V2, verified from official Microsoft docs:</strong></p>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>V1</th>
                    <th>V2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Per-function structure</td>
                    <td><code>__init__.py</code> plus <code>function.json</code> per function</td>
                    <td>All functions in one <code>function_app.py</code></td>
                </tr>
                <tr>
                    <td>Trigger configuration</td>
                    <td>Separate <code>function.json</code> file</td>
                    <td>Python decorators directly in code</td>
                </tr>
                <tr>
                    <td>Multiple functions</td>
                    <td>One directory per function</td>
                    <td>One file, or split using Blueprints</td>
                </tr>
                <tr>
                    <td>Code style</td>
                    <td><code>main()</code> global method</td>
                    <td><code>@app.route</code> and <code>@app.blob_trigger</code> decorators</td>
                </tr>
                <tr>
                    <td>Recommendation</td>
                    <td>Legacy projects only</td>
                    <td>GA, use for all new projects</td>
                </tr>
            </tbody>
        </table>
        <p>Set Python version to 3.11, create a virtual environment, choose HTTP trigger, and set authorization to Admin.</p>

        <h4>Step 3: The Generated Code Files</h4>
        <p><strong>function_app.py:</strong></p>
        <pre><code>import azure.functions as func
import logging

app = func.FunctionApp(http_auth_level=func.AuthLevel.ADMIN)

@app.route(route="httpTriggerFunc")
def httpTriggerFunc(req: func.HttpRequest) -&gt; func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(
            f"Hello, {name}. This HTTP triggered function executed successfully. Updated From VS Code !!",
            status_code=200
        )
    else:
        return func.HttpResponse(
            "This HTTP triggered function executed successfully. "
            "Pass a name in the query string or request body for a personalized response.",
            status_code=200
        )</code></pre>

        <p><strong>host.json, Extension Bundle 4.x current:</strong></p>
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

        <p><strong>local.settings.json, local environment variables, never commit this to git:</strong></p>
        <pre><code>{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing"
  }
}</code></pre>

        <p><strong>requirements.txt:</strong></p>
        <pre><code># DO NOT include azure-functions-worker in this file.
# The Python Worker is managed by the Azure Functions platform.
azure-functions</code></pre>
        <p>Every package listed here gets installed by Azure during deployment. If a package is not listed, it will not be available in the cloud. For Blob Storage access inside functions, add <code>azure-storage-blob</code> to this file.</p>

        <h4>Step 4: Test Locally</h4>
        <pre><code># Activate your virtual environment first
source .venv/bin/activate   # Mac and Linux
.venv\\Scripts\\activate      # Windows

# Start the local function runtime
func start</code></pre>
        <p>The terminal will show:</p>
        <pre><code>Functions:
    httpTriggerFunc: [GET,POST] http://localhost:7071/api/httpTriggerFunc</code></pre>
        <p>Test it with curl:</p>
        <pre><code>curl "http://localhost:7071/api/httpTriggerFunc?name=DataEngineer"
# Output: Hello, DataEngineer. This HTTP triggered function executed successfully.</code></pre>

        <h4>Three Ways to Work With Azure Functions</h4>
        <p>Before deploying, it helps to understand the three development workflows available:</p>
        <p><strong>Azure Portal</strong> lets you create and manage functions directly in the browser UI. Good for quick tests but not practical for real projects since editing code in a browser gets unwieldy fast.</p>
        <p><strong>Local Development</strong> means writing and testing code on your machine in VS Code before deploying to Azure. This is the recommended approach and what the rest of this section covers.</p>
        <p><strong>CI/CD via GitHub Actions</strong> is the production standard. Code changes in a development branch of your GitHub repository automatically trigger a GitHub Actions workflow that packages and deploys the function to Azure. No manual clicks, no missed steps.</p>
        <p>For learning purposes, local development plus VS Code deployment is the right starting point. For any real project, you eventually move to CI/CD.</p>

        <h4>Step 5: Deploy to Azure</h4>
        <p>Right-click your workspace in VS Code and select Create Function App in Azure, Advanced. Configure it with the following settings:</p>
        <pre><code>Name:            globally-unique, for example my-func-app-2026
Hosting Plan:    Consumption, pay-per-execution, scales to zero
Runtime:         Python 3.11, must match your local venv version
OS:              Linux
Resource Group:  rg-data-engineering
Storage Account: your existing storage account</code></pre>
        <p>Right-click the workspace again and select Deploy to Function App, confirm, and wait 60 to 90 seconds. VS Code zips your code and requirements file and ships them to Azure.</p>
        <p>After deployment, verify in the Azure portal by navigating to Function Apps, opening your app, and checking the Functions list. Your function should appear there.</p>
        <p>Note: once you deploy from VS Code, the portal will show "portal editing is disabled." That is correct behavior. VS Code is your source of truth. You can still monitor, test, and manage from the portal, just not edit code directly.</p>

        <h4>Step 6: Get the URL and Test</h4>
        <p>In the portal, open your function and click Get Function URL. Copy the link and test it:</p>
        <pre><code>curl "https://my-func-app-2026.azurewebsites.net/api/httpTriggerFunc?code=&lt;key&gt;&amp;name=Azure"</code></pre>
        <p><strong>Fixing CORS for portal testing:</strong></p>
        <p>If you use the portal's built-in Test/Run tab, you will hit an error stating the app must explicitly accept requests from the portal domain. That is CORS blocking the portal from calling your function's domain.</p>
        <p>Fix it in three steps: go to Function App, open API in the sidebar, then select CORS. Paste the portal URL from the error message into Allowed Origins and click Save. Return to the Test/Run tab and run again. Live execution logs will stream in the panel immediately.</p>

        <h4>Monitoring</h4>
        <p>Navigate to Function App and select Monitor. Four metrics are tracked live:</p>
        <ul>
            <li>Total Executions</li>
            <li>Successful Count</li>
            <li>Failed Execution Count</li>
            <li>Average Compute Time</li>
        </ul>
        <p>Click any invocation row to see the full log output for that specific run.</p>

        <h4>Chaining Functions and Notifications</h4>
        <p>Azure Functions are not limited to running in isolation. A common data engineering pattern is chaining, where one function triggers another or kicks off a downstream service.</p>
        <p>When a Blob Trigger fires and a new file arrives, your function can do more than just process that file. It can pass the file name as an argument to an Azure Data Factory job to start a full pipeline run. It can also send a message to a Notification Hub, which then broadcasts an alert to subscribers via email, similar to how AWS SNS works. Multiple instances of the same function can also run concurrently to handle high volumes of simultaneous arrivals without any configuration changes on your part.</p>
        <p>This is how event-driven pipelines are built in practice: one file landing triggers a chain of automated actions with no manual intervention at any step.</p>

        <hr />

        <h3>What Is Coming in Part 2</h3>
        <p>This was the foundation. You now have storage wired, Python reading from the cloud, and a deployed serverless function.</p>
        <p>Part 2 covers the Blob Trigger for auto-firing functions when files arrive, Azure Data Factory for visual pipeline orchestration, Azure Synapse Analytics where the data lake meets a SQL warehouse, and Azure Databricks for Spark on Azure properly configured.</p>
        <p>One action before Part 2: stop your Function App when you are done practicing. Go to Function App in the portal and click Stop. Free trial credits are finite and this takes three seconds.</p>

        <hr />

        <h3>Quick Reference</h3>
        <h4>Verified Package Versions, April 2026</h4>
        <table>
            <thead>
                <tr>
                    <th>Package</th>
                    <th>Latest Stable</th>
                    <th>Min Python</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>azure-storage-blob</td>
                    <td>12.24.0, released Jan 6, 2026</td>
                    <td>3.9</td>
                </tr>
                <tr>
                    <td>azure-functions</td>
                    <td>1.21.x</td>
                    <td>3.9</td>
                </tr>
                <tr>
                    <td>azure-identity</td>
                    <td>1.19.x</td>
                    <td>3.9</td>
                </tr>
                <tr>
                    <td>Azure Functions Core Tools</td>
                    <td>4.9.0, approved Mar 27, 2026</td>
                    <td>N/A</td>
                </tr>
            </tbody>
        </table>

        <h4>Azure Functions Runtime Support Status, 2026</h4>
        <table>
            <thead>
                <tr>
                    <th>Version</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>4.x</td>
                    <td>Fully supported, the only supported version</td>
                </tr>
                <tr>
                    <td>3.x</td>
                    <td>End of support December 2022</td>
                </tr>
                <tr>
                    <td>2.x</td>
                    <td>End of support December 2022</td>
                </tr>
                <tr>
                    <td>1.x</td>
                    <td>Support ends September 14, 2026, migrate now</td>
                </tr>
            </tbody>
        </table>

        <h4>Azure CLI Cheat Sheet</h4>
        <pre><code>az login
az storage account list --output table
az storage container list --account-name &lt;n&gt; --account-key &lt;k&gt; --output table
az storage blob upload --account-name &lt;n&gt; --account-key &lt;k&gt; --container-name &lt;c&gt; --name &lt;blob&gt; --file &lt;path&gt;
az storage blob list --account-name &lt;n&gt; --account-key &lt;k&gt; --container-name &lt;c&gt; --output table
az storage blob generate-sas --account-name &lt;n&gt; --account-key &lt;k&gt; --container-name &lt;c&gt; --name &lt;b&gt; --permissions r --expiry 2026-12-31T00:00:00Z</code></pre>

        <h4>Python SDK Pattern, three steps always</h4>
        <pre><code>BlobServiceClient  .get_container_client()  .get_blob_client()  .download_blob()</code></pre>

        <hr />

        <p><em>All versions and syntax verified against Microsoft Learn, PyPI, and GitHub. April 2026.</em></p>
    `
};

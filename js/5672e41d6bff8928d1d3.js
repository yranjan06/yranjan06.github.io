"use strict";
(self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || []).push([[79],{

/***/ 79:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Blog)
});

;// ./src/app/consts/azurePart3.js
const azurePart3Content = {
    id: 5,
    title: "Azure SQL Database: Your Beginner Friendly Starting Point",
    date: "2024-12-27",
    categories: ["Cloud Computing", "Azure", "Database"],
    tags: ["azure", "sql", "database", "cloud", "microsoft", "paas"],
    excerpt: "Azure SQL Database is Microsoft's intelligent, scalable, cloud database service. Learn how to get started with Azure SQL Database, understand its key features, pricing tiers, and how it differs from traditional SQL Server deployments.",
    slug: "getting-started-azure-sql-database",
    readTime: 8,
    content: `
        <div class="audio-header-container" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
            <h3 style="margin: 0; flex: 1; min-width: 200px;">What is Azure SQL Database?</h3>
        </div>
        
        <p>Azure SQL Database is a fully managed Platform as a Service (PaaS) database engine provided by Microsoft. Unlike traditional SQL Server where you need to manage the server, install updates, configure backups, and handle all infrastructure concerns, Azure SQL Database takes care of all these operational tasks automatically. You simply focus on your database design, queries, and application logic.</p>
        
        <h3>Why Choose Azure SQL Database?</h3>
        <p>Azure SQL Database offers several compelling advantages over traditional database hosting:</p>
        <ul>
            <li><strong>Fully Managed Service:</strong> No need to worry about patching, backups, or high availability configuration - Azure handles it all</li>
            <li><strong>Automatic Scaling:</strong> Scale up or down based on your workload demands without downtime</li>
            <li><strong>Built-in Intelligence:</strong> AI-powered performance optimization and threat detection</li>
            <li><strong>High Availability:</strong> 99.99% SLA with built-in redundancy</li>
            <li><strong>Global Scale:</strong> Deploy databases in Azure regions worldwide</li>
            <li><strong>Cost Effective:</strong> Pay only for what you use with multiple pricing tiers</li>
        </ul>
        
        <h3>Key Differences from SQL Server</h3>
        <p>While Azure SQL Database is based on SQL Server, there are some important differences to be aware of:</p>
        
        <h4>What's the Same:</h4>
        <ul>
            <li>T-SQL query language and syntax</li>
            <li>Tables, views, stored procedures, and functions</li>
            <li>Indexes and query optimization</li>
            <li>Security features like encryption and authentication</li>
        </ul>
        
        <h4>What's Different:</h4>
        <ul>
            <li>No access to the underlying operating system or file system</li>
            <li>Some administrative features are managed automatically</li>
            <li>Limited SQL Server Agent functionality</li>
            <li>Database size limits based on your service tier</li>
        </ul>
        
        <h3>Service Tiers and Pricing Models</h3>
        <p>Azure SQL Database offers different service tiers to match various workload requirements:</p>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="images/Blog/azure-sql-tiers.webp" alt="Azure SQL Database Service Tiers" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <h4>1. DTU-based Model (Database Transaction Units)</h4>
        <p>The DTU model provides a simple, bundled measure of compute, storage, and I/O resources:</p>
        <ul>
            <li><strong>Basic:</strong> Best for small databases with light workloads (up to 2GB)</li>
            <li><strong>Standard:</strong> Good for most production workloads (up to 1TB)</li>
            <li><strong>Premium:</strong> High-performance, mission-critical workloads (up to 4TB)</li>
        </ul>
        
        <h4>2. vCore-based Model</h4>
        <p>The vCore model gives you more control over compute and storage resources separately:</p>
        <ul>
            <li><strong>General Purpose:</strong> Balanced compute and I/O performance</li>
            <li><strong>Business Critical:</strong> Highest I/O performance with built-in read replicas</li>
            <li><strong>Hyperscale:</strong> Highly scalable storage (up to 100TB) with fast backups and restores</li>
        </ul>
        
        <h3>Creating Your First Azure SQL Database</h3>
        <p>Let's walk through the steps to create your first Azure SQL Database:</p>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="images/Blog/azure-sql-create.webp" alt="Azure SQL Database Creation Process" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <h4>Step 1: Navigate to Azure Portal</h4>
        <p>Log in to the Azure Portal (portal.azure.com) and click on "Create a resource" from the home page or left navigation menu.</p>
        
        <h4>Step 2: Search for SQL Database</h4>
        <p>In the search box, type "SQL Database" and select it from the results. Click the "Create" button to begin the setup process.</p>
        
        <h4>Step 3: Configure Basic Settings</h4>
        <p>You'll need to configure several basic settings:</p>
        <ul>
            <li><strong>Subscription:</strong> Select your Azure subscription</li>
            <li><strong>Resource Group:</strong> Create a new resource group or select an existing one</li>
            <li><strong>Database Name:</strong> Give your database a meaningful name</li>
            <li><strong>Server:</strong> Create a new server or select an existing one</li>
        </ul>
        
        <h4>Step 4: Create SQL Database Server</h4>
        <p>If you're creating a new server, you'll need to provide:</p>
        <ul>
            <li><strong>Server Name:</strong> Must be globally unique (e.g., mycompany-sqlserver-prod)</li>
            <li><strong>Location:</strong> Choose the Azure region closest to your users</li>
            <li><strong>Authentication Method:</strong> Choose between SQL authentication or Azure Active Directory</li>
            <li><strong>Admin Username and Password:</strong> Set credentials for server administration</li>
        </ul>
        
        <h4>Step 5: Choose Compute and Storage</h4>
        <p>Select your pricing tier based on your workload requirements. For learning and development, the Basic tier or serverless option is cost-effective. For production workloads, consider Standard or General Purpose tiers.</p>
        
        <h4>Step 6: Configure Networking</h4>
        <p>Set up network access rules:</p>
        <ul>
            <li><strong>Connectivity Method:</strong> Public endpoint (with firewall rules) or Private endpoint</li>
            <li><strong>Firewall Rules:</strong> Add your current IP address to allow connections from your machine</li>
            <li><strong>Allow Azure Services:</strong> Enable if you want other Azure services to access your database</li>
        </ul>
        
        <h4>Step 7: Additional Settings</h4>
        <p>Configure optional settings like:</p>
        <ul>
            <li>Starting with an empty database or sample data (AdventureWorksLT)</li>
            <li>Collation settings for character sorting and comparison</li>
            <li>Advanced data security and auditing features</li>
        </ul>
        
        <h4>Step 8: Review and Create</h4>
        <p>Review all your settings, check the estimated monthly cost, and click "Create" to deploy your database. Deployment typically takes 2-5 minutes.</p>
        
        <h3>Connecting to Your Database</h3>
        <p>Once your database is created, you can connect to it using various tools:</p>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="images/Blog/azure-sql-connect.webp" alt="Connecting to Azure SQL Database" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <h4>Using Azure Portal Query Editor</h4>
        <p>The simplest way to run queries is using the built-in Query Editor in the Azure Portal. Navigate to your database and click "Query editor" in the left menu. Enter your credentials and start running SQL queries directly in the browser.</p>
        
        <h4>Using SQL Server Management Studio (SSMS)</h4>
        <p>For a full-featured desktop experience, use SSMS:</p>
        <pre><code>Server: your-server-name.database.windows.net
Authentication: SQL Server Authentication
Login: your-admin-username
Password: your-admin-password</code></pre>
        
        <h4>Using Connection String in Applications</h4>
        <p>To connect from your application code, Azure provides ready-to-use connection strings. In the Azure Portal, go to your database, click "Connection strings" and copy the appropriate connection string for your programming language (ADO.NET, JDBC, PHP, etc.).</p>
        
        <h3>Security Best Practices</h3>
        <p>Securing your Azure SQL Database is crucial:</p>
        <ul>
            <li><strong>Use Firewall Rules:</strong> Only allow connections from trusted IP addresses</li>
            <li><strong>Enable Transparent Data Encryption (TDE):</strong> Automatically encrypts data at rest (enabled by default)</li>
            <li><strong>Use Azure Active Directory Authentication:</strong> More secure than SQL authentication</li>
            <li><strong>Enable Advanced Threat Protection:</strong> Detects anomalous activities and potential threats</li>
            <li><strong>Implement Row-Level Security:</strong> Control access to specific rows based on user identity</li>
            <li><strong>Use Always Encrypted:</strong> Protects sensitive data even from database administrators</li>
        </ul>
        
        <h3>Monitoring and Performance</h3>
        <p>Azure SQL Database provides rich monitoring capabilities:</p>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="images/Blog/azure-sql-monitoring.webp" alt="Azure SQL Database Monitoring Dashboard" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <ul>
            <li><strong>Query Performance Insight:</strong> Identifies top resource-consuming queries</li>
            <li><strong>Automatic Tuning:</strong> AI-powered recommendations for index creation and query optimization</li>
            <li><strong>Metrics and Alerts:</strong> Monitor CPU, memory, I/O, and connection metrics</li>
            <li><strong>Intelligent Insights:</strong> Automatic detection of performance issues with root cause analysis</li>
        </ul>
        
        <h3>Backup and Recovery</h3>
        <p>Azure SQL Database automatically handles backups:</p>
        <ul>
            <li><strong>Automatic Backups:</strong> Full backups weekly, differential backups every 12-24 hours, transaction log backups every 5-10 minutes</li>
            <li><strong>Point-in-Time Restore:</strong> Restore your database to any point within the retention period (7-35 days depending on tier)</li>
            <li><strong>Long-term Retention:</strong> Keep backups for up to 10 years for compliance requirements</li>
            <li><strong>Geo-Restore:</strong> Restore from geo-replicated backups if primary region fails</li>
        </ul>
        
        <h3>Scaling Your Database</h3>
        <p>One of the key advantages of Azure SQL Database is the ability to scale seamlessly:</p>
        
        <h4>Vertical Scaling (Scale Up/Down)</h4>
        <p>Change your service tier or increase compute resources as your needs grow. This can be done with minimal downtime (typically a few seconds during connection handoff).</p>
        
        <h4>Horizontal Scaling (Scale Out)</h4>
        <p>For read-heavy workloads, you can use read replicas to distribute read queries across multiple databases. The Hyperscale tier provides the most flexible scaling options.</p>
        
        <h4>Serverless Option</h4>
        <p>For intermittent workloads, the serverless compute tier automatically pauses when inactive and resumes when activity is detected. You only pay for the compute you actually use.</p>
        
        <h3>Cost Optimization Tips</h3>
        <p>Keep your Azure SQL Database costs under control:</p>
        <ul>
            <li><strong>Right-size Your Tier:</strong> Start with a lower tier and scale up only when needed</li>
            <li><strong>Use Serverless for Dev/Test:</strong> Serverless can reduce costs significantly for non-production environments</li>
            <li><strong>Monitor Resource Usage:</strong> Regularly review your DTU/vCore utilization to ensure you're not over-provisioned</li>
            <li><strong>Implement Elastic Pools:</strong> If you have multiple databases with variable usage patterns, elastic pools can reduce costs</li>
            <li><strong>Set Up Auto-pause:</strong> For serverless databases, configure appropriate auto-pause delays</li>
            <li><strong>Delete Unused Databases:</strong> Remove test databases and old backups you no longer need</li>
        </ul>
        
        <h3>Common Use Cases</h3>
        <p>Azure SQL Database is ideal for:</p>
        <ul>
            <li><strong>Web Applications:</strong> Backend database for SaaS applications with global reach</li>
            <li><strong>Mobile Apps:</strong> Reliable data storage with automatic scaling</li>
            <li><strong>E-commerce:</strong> High availability and performance for transaction processing</li>
            <li><strong>Line of Business Apps:</strong> Modern cloud-based enterprise applications</li>
            <li><strong>Development and Testing:</strong> Quickly spin up databases for development without infrastructure overhead</li>
            <li><strong>Data Warehousing:</strong> With Hyperscale tier for large analytical workloads</li>
        </ul>
        
        <h3>Next Steps</h3>
        <p>Now that you understand the basics of Azure SQL Database, here are some recommended next steps:</p>
        <ul>
            <li>Create a free Azure account and set up your first SQL Database</li>
            <li>Explore the sample AdventureWorksLT database to practice queries</li>
            <li>Learn about elastic pools for managing multiple databases</li>
            <li>Experiment with automatic tuning and Query Performance Insight</li>
            <li>Set up geo-replication for disaster recovery</li>
            <li>Integrate Azure SQL Database with your applications using Entity Framework or other ORMs</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>Azure SQL Database provides a powerful, fully-managed database solution that eliminates infrastructure management overhead while providing enterprise-grade features. Whether you're building a new cloud-native application or migrating existing workloads, Azure SQL Database offers the flexibility, scalability, and reliability needed for modern applications.</p>
        
        <p>The combination of automatic management, built-in intelligence, and global scale makes Azure SQL Database an excellent choice for organizations of all sizes. Start small, experiment with the platform, and scale as your needs grow.</p>
    `
};

;// ./src/app/consts/blogPosts.js


const blogPosts = [
    azurePart3Content,
    {
        id: 1,
        title: "Azure Virtual Machine",
        date: "2024-12-26",
        categories: ["Cloud Computing", "Azure"],
        tags: ["azure", "virtual-machine", "cloud", "microsoft"],
        excerpt: "An Azure Virtual Machine (VM) is essentially a computer that exists inside Microsoft's cloud data centers instead of sitting physically on your desk. Learn how Azure VMs provide flexible, scalable computing resources that you can access through the internet with full control over the operating system and resources.",
        slug: "azure-virtual-machine",
        readTime: 5,
        content: `
            <div class="audio-header-container" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                <h3 style="margin: 0; flex: 1; min-width: 200px;">What is an Azure Virtual Machine?</h3>
                <div class="audio-controls" style="display: flex; align-items: center; gap: 10px; flex-wrap: nowrap;">
                    <audio id="azure-audio-1" style="display: none;" 
                           ontimeupdate="document.getElementById('audio-progress-1').style.width = ((this.currentTime / this.duration) * 100) + '%';"
                           onplay="document.getElementById('logo-btn-1').style.opacity='1'; document.getElementById('wave-1').style.display='flex'; document.querySelectorAll('#logo-btn-1 path').forEach(p => p.style.color='hsl(354.4, 81.96%, 55.66%)');"
                           onpause="document.getElementById('logo-btn-1').style.opacity='0.5'; document.getElementById('wave-1').style.display='none'; document.querySelectorAll('#logo-btn-1 path').forEach(p => p.style.color='hsl(219, 14%, 71%)');"
                           onended="document.getElementById('logo-btn-1').style.opacity='0.5'; document.getElementById('wave-1').style.display='none'; document.getElementById('audio-progress-1').style.width='0%'; document.querySelectorAll('#logo-btn-1 path').forEach(p => p.style.color='hsl(219, 14%, 71%)');">
                        <source src="images/BlogAudio/Azure01/Azure.m4a" type="audio/mp4">
                    </audio>
                    <button id="logo-btn-1" onclick="document.getElementById('azure-audio-1').paused ? document.getElementById('azure-audio-1').play() : document.getElementById('azure-audio-1').pause()" 
                            style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid hsl(219, 14%, 71%); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; padding: 8px; flex-shrink: 0; opacity: 0.5;"
                            onmouseover="this.style.background='hsl(219, 14%, 71%, 0.1)'; this.style.borderColor='hsl(0, 0%, 100%)';"
                            onmouseout="this.style.background='transparent'; this.style.borderColor='hsl(219, 14%, 71%)';">
                        <svg width="24" height="24" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 1 50 L 1 1 L 51 1 L 51 25 L 38 25 L 38 12 L 13 12 L 13 51 L 1 51" 
                                  fill="currentColor" 
                                  stroke="currentColor" 
                                  stroke-width="1" 
                                  stroke-linejoin="round" 
                                  stroke-linecap="round"
                                  style="color: hsl(219, 14%, 71%); transition: color 0.3s ease;"/>
                            <path d="M 21 25 L 34 25 L 34 38 L 51 38 L 51 51 L 21 51 Z" 
                                  fill="currentColor" 
                                  stroke="currentColor" 
                                  stroke-width="1" 
                                  stroke-linejoin="round" 
                                  stroke-linecap="round"
                                  style="color: hsl(219, 14%, 71%); transition: color 0.3s ease;"/>
                        </svg>
                    </button>
                    <div id="wave-1" style="display: none; align-items: center; gap: 3px; height: 40px;">
                        <div style="width: 3px; height: 12px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0s;"></div>
                        <div style="width: 3px; height: 20px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.1s;"></div>
                        <div style="width: 3px; height: 16px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.2s;"></div>
                        <div style="width: 3px; height: 24px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.3s;"></div>
                        <div style="width: 3px; height: 14px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.4s;"></div>
                    </div>
                    <div class="audio-progress-bar" 
                         onclick="const rect = this.getBoundingClientRect(); const percent = (event.clientX - rect.left) / rect.width; const audio = document.getElementById('azure-audio-1'); audio.currentTime = percent * audio.duration;"
                         style="width: 150px; height: 4px; background: hsl(219, 14%, 71%, 0.2); border-radius: 2px; overflow: hidden; position: relative; cursor: pointer;">
                        <div id="audio-progress-1" style="width: 0%; height: 100%; background: hsl(219, 14%, 71%); transition: width 0.1s linear; pointer-events: none;"></div>
                    </div>
                </div>
            </div>
            <style>
                @keyframes wave {
                    0%, 100% { height: 12px; }
                    50% { height: 28px; }
                }
                
                @media (max-width: 768px) {
                    .audio-header-container {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 10px !important;
                    }
                    
                    .audio-header-container h3 {
                        width: 100%;
                    }
                    
                    .audio-controls {
                        width: 100%;
                        justify-content: flex-start !important;
                    }
                    
                    .audio-progress-bar {
                        flex: 1;
                        min-width: 100px !important;
                        max-width: 100% !important;
                        width: auto !important;
                    }
                }
                
                @media (max-width: 500px) {
                    .audio-header-container {
                        gap: 8px !important;
                    }
                    
                    .audio-controls {
                        gap: 8px !important;
                    }
                    
                    #logo-btn-1 {
                        width: 36px !important;
                        height: 36px !important;
                    }
                    
                    #wave-1 {
                        height: 36px !important;
                    }
                }
            </style>
            <p>An Azure Virtual Machine (VM) is essentially a computer that exists inside Microsoft's cloud data centers instead of sitting physically on your desk. To understand this easily, imagine that instead of buying a laptop or server, you are renting a powerful computer from Microsoft. You can turn it on, turn it off, install software on it, and work on it exactly like your own system, but you access it through the internet.</p>
            
            <h3>How Does It Work?</h3>
            <p>This virtual computer is not imaginary or fake. It is a real physical machine running in a Microsoft data center somewhere in the world. The only difference is that you do not see or touch it physically. Azure manages the hardware, electricity, cooling, and security, while you focus only on using the computer.</p>
            
            <h3>Full Control and Flexibility</h3>
            <p>With an Azure VM, you get full control. You decide which Operating System you want to run, such as Windows Server or Ubuntu Linux. You also choose how much RAM, how many CPU cores, and how much storage the machine should have. This flexibility makes Azure Virtual Machines extremely powerful for developers, students, startups, and enterprises.</p>
            
            <div class="blog-post__image">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="images/Blog/ghar-to-datacenter.webp" alt="Azure VM connection from home to data center" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
            </div>
            
            <h3>How to create VM in Azure ?</h3>
            <p>To create a Virtual Machine, you first need to log in to the Azure Portal, which is Microsoft's web-based dashboard for managing cloud resources. Once logged in, you click on "Create a Resource" and then select Virtual Machine. From here, Azure guides you through a step-by-step process where you configure your VM.</p>
            <p>Although the process looks long, it is actually logical and structured. Each step helps Azure understand what kind of machine you want to create.</p>
            
            <div class="blog-post__image">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="images/Blog/Your paragraph text.webp" alt="Azure VM creation process" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
            </div>
            
            <h3>Project Details: Subscription and Resource Group</h3>
            <p>The first configuration step involves selecting a <strong>Subscription</strong> and a <strong>Resource Group</strong>. A subscription defines who pays the bill for your Azure resources. If you have multiple Azure accounts or free credits, the subscription determines which account will be charged for the resources you create.</p>
            <p>A Resource Group can be understood as a logical container or folder where you organize related resources. All resources associated with a single project—such as Virtual Machines, storage disks, IP addresses, and virtual networks—are stored inside one resource group. This organizational structure makes it easier to manage, monitor, and control costs for your entire project.</p>
            <p>One significant advantage of using resource groups is simplified cleanup. When you delete a resource group, all resources contained within it are automatically deleted as well. This prevents orphaned resources that could continue incurring charges.</p>
            
            <div class="blog-post__image">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="images/Blog/Subscription.webp" alt="Azure Subscription and Resource Group configuration" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
            </div>
        `
    },
    {
        id: 2,
        title: "Project, Kafka Consumption Group and Topic Relationship",
        date: "2024-09-22",
        categories: ["Apache Kafka", "Big Data"],
        tags: ["kafka", "microservices", "distributed-systems"],
        excerpt: "The project here can be regarded as a microservice. You need to choose the project, consumption group and topic relationship according to the scenario. Under one project: multiple consumption groups correspond to one topic. (n: 1) Academic aesthetic education settlement. Under a project, multiple consumption groups correspond to multiple topics. (1: n) None for the time being??? Under a project, a consumption group corresponds to multiple topics. (1: n) Academic order, ...",
        slug: "kafka-consumption-group-topic-relationship",
        readTime: 5,
        content: `
            <p>When designing distributed systems with Apache Kafka, understanding the relationship between projects, consumption groups, and topics is crucial for building scalable and maintainable architectures.</p>
            
            <h3>Project as Microservice</h3>
            <p>In modern architecture, we can consider each project as an independent microservice. This approach helps in maintaining clear boundaries and responsibilities.</p>
            
            <h3>Relationship Patterns</h3>
            <h4>Multiple Consumption Groups to One Topic (n:1)</h4>
            <p>This pattern is useful when multiple services need to process the same stream of data independently. Each consumption group maintains its own offset, allowing parallel processing without interference.</p>
            
            <h4>One Consumption Group to Multiple Topics (1:n)</h4>
            <p>This pattern allows a single service to consume from multiple related topics, useful for data aggregation and correlation scenarios.</p>
            
            <h4>Multiple Consumption Groups to Multiple Topics (n:n)</h4>
            <p>The most complex but flexible pattern, suitable for large-scale systems with complex data flow requirements.</p>
        `
    },
    {
        id: 3,
        title: "Vector Search with Faiss: A Practical Guide",
        date: "2024-01-07",
        categories: ["Deep Learning", "NLP"],
        tags: ["faiss", "vector-search", "similarity-search", "ai"],
        excerpt: "Faiss introduction Faiss is a library for efficient similarity search and clustering of dense vectors. Official introduction: Faiss is a library for efficient similarity search and dense vector clustering. That is, it is used to achieve efficient vector retrieval. Faiss main component package...",
        slug: "vector-search-faiss-practice",
        readTime: 8,
        content: `
            <p>Faiss (Facebook AI Similarity Search) is a powerful library developed by Facebook AI Research for efficient similarity search and clustering of dense vectors.</p>
            
            <h3>What is Faiss?</h3>
            <p>Faiss is designed to handle large-scale vector databases efficiently. It provides both exact and approximate nearest neighbor search algorithms, making it suitable for various applications from recommendation systems to semantic search.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Efficient similarity search for dense vectors</li>
                <li>Support for both CPU and GPU operations</li>
                <li>Multiple indexing algorithms (Flat, IVF, HNSW, etc.)</li>
                <li>Scalable to billions of vectors</li>
            </ul>
            
            <h3>Getting Started</h3>
            <p>Installation is straightforward with pip:</p>
            <pre><code>pip install faiss-cpu  # for CPU version
pip install faiss-gpu  # for GPU version</code></pre>
            
            <h3>Basic Usage Example</h3>
            <pre><code>import faiss
import numpy as np

# Generate sample data
d = 128  # dimension
nb = 100000  # database size
nq = 10000  # number of queries

np.random.seed(1234)
xb = np.random.random((nb, d)).astype('float32')
xq = np.random.random((nq, d)).astype('float32')

# Build index
index = faiss.IndexFlatL2(d)
index.add(xb)

# Search
k = 4  # number of nearest neighbors
D, I = index.search(xq, k)</code></pre>
        `
    },
    {
        id: 4,
        title: "Building Scalable Data Pipelines with Apache Airflow",
        date: "2024-08-15",
        categories: ["Data Pipelines", "ETL"],
        tags: ["airflow", "data-pipelines", "workflow", "orchestration"],
        excerpt: "Apache Airflow has become the de facto standard for orchestrating complex data workflows. In this post, we'll explore best practices for building scalable and maintainable data pipelines using Airflow, including DAG design patterns, error handling strategies, and performance optimization techniques.",
        slug: "scalable-data-pipelines-airflow",
        readTime: 12,
        content: `
            <p>Apache Airflow has revolutionized the way we think about data pipeline orchestration. As data teams scale and workflows become more complex, having a robust orchestration platform becomes critical.</p>
            
            <h3>Why Airflow?</h3>
            <p>Airflow provides several key advantages for data pipeline orchestration:</p>
            <ul>
                <li>Rich user interface for monitoring and debugging</li>
                <li>Extensive operator ecosystem</li>
                <li>Dynamic DAG generation</li>
                <li>Built-in retry and error handling mechanisms</li>
                <li>Strong community and enterprise support</li>
            </ul>
            
            <h3>DAG Design Best Practices</h3>
            <h4>1. Keep DAGs Simple and Focused</h4>
            <p>Each DAG should have a single, well-defined purpose. Avoid creating monolithic DAGs that try to do everything.</p>
            
            <h4>2. Use Meaningful Names and Documentation</h4>
            <p>Clear naming conventions and comprehensive documentation make your pipelines maintainable.</p>
            
            <h4>3. Implement Proper Error Handling</h4>
            <p>Use retries, alerting, and failure callbacks to ensure robust pipeline execution.</p>
        `
    }
];

const getPostBySlug = (slug) => {
    return blogPosts.find(post => post.slug === slug);
};

const getPostsByCategory = (category) => {
    return blogPosts.filter(post => 
        post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    );
};

const getPostsByTag = (tag) => {
    return blogPosts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
};

const getAllCategories = () => {
    const categories = new Set();
    blogPosts.forEach(post => {
        post.categories.forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
};

const getAllTags = () => {
    const tags = new Set();
    blogPosts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
};
;// ./src/app/views/Blog.js





/* harmony default export */ const Blog = ((t) => {
    const categories = getAllCategories();
    const tags = getAllTags();

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const tag = params.get('tag');

    let postsToRender = blogPosts;
    if (category) {
        postsToRender = getPostsByCategory(category);
    } else if (tag) {
        postsToRender = getPostsByTag(tag);
    }

    // Check if we're viewing a specific blog post
    const currentHash = window.location.hash.slice(1); // Remove the # character
    const currentPost = currentHash ? getPostBySlug(currentHash) : null;

    const renderSidebar = () => /*html*/ `
        <aside class="blog-sidebar">
            <div class="blog-sidebar__profile">
                <!-- Profile Icon -->
                <div class="blog-sidebar__avatar">
                    <svg width="40" height="40" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Outer L-shaped path -->
                    <path d="M 1 50 L 1 1 L 51 1 L 51 25 L 38 25 L 38 12 L 13 12 L 13 51 L 1 51" 
                            fill="white" 
                            stroke="white" 
                            stroke-width="" 
                            stroke-linejoin="round" 
                            stroke-linecap="round"/>
                    
                    <!-- Inner rectangular path -->
                    <path d="M 21 25 L 34 25 L 34 38 L 51 38 L 51 51 L 21 51 Z" 
                            fill="none" 
                            stroke="white" 
                            stroke-width="1" 
                            stroke-linejoin="round" 
                            stroke-linecap="round"/>
                    </svg>
                </div>
                <h1 class="blog-sidebar__title">Ranjan's Blog</h1>
                <p class="blog-sidebar__subtitle">
                    For learning more and more, for the way to lose day by day
                </p>
                <div class="blog-sidebar__social">
                    <a href="https://github.com" class="blog-sidebar__social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.866 8.158 6.84 9.489.5.09.682-.218.682-.484 0-.237-.009-.868-.014-1.7-.278.048-.999.199-1.201.199-.548 0-1.28-.686-1.554-1.385-.453-1.156-1.11-1.465-1.11-1.465-.908-.62.069-.607.069-.607 1.004.07 1.532 1.03 1.532 1.03.89 1.528 2.336 1.085 2.903.83.091-.645.347-1.085.632-1.336-2.22-.252-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.684-.103-.252-.447-1.27.098-2.65 0 0 .84-.269 2.75 1.028a9.584 9.584 0 015 0c1.91-1.297 2.75-1.028 2.75-1.028.546 1.38.202 2.398.098 2.65.64.7 1.029 1.593 1.029 2.684 0 3.843-2.336 4.691-4.566 4.935.359.309.678.919.678 1.854 0 1.336-.012 2.416-.012 2.744 0 .267.18.578.688.484C19.136 20.158 22 16.411 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com" class="blog-sidebar__social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.763s.784-1.763 1.75-1.763 1.75.79 1.75 1.763-.784 1.763-1.75 1.763zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="blog-sidebar__stats">
                <div class="blog-sidebar__stat">
                    <a href="/blog" class="blog-sidebar__stat-label">Posts</a>
                    <span class="blog-sidebar__stat-value">${blogPosts.length}</span>
                </div>
                <div class="blog-sidebar__stat">
                    <a href="/categories" class="blog-sidebar__stat-label">Categories</a>
                    <span class="blog-sidebar__stat-value">${categories.length}</span>
                </div>
                <div class="blog-sidebar__stat">
                    <a href="/tags" class="blog-sidebar__stat-label">Tags</a>
                    <span class="blog-sidebar__stat-value">${tags.length}</span>
                </div>
            </div>
        </aside>
    `;

    // Function to extract headings for Table of Contents
    const extractHeadings = (content) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        return Array.from(headings).map((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            return {
                id,
                text: heading.textContent,
                level: parseInt(heading.tagName.charAt(1))
            };
        });
    };

    const renderFullPost = (post) => {
        const headings = extractHeadings(post.content);
        const contentWithIds = (() => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = post.content;
            const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headingElements.forEach((heading, index) => {
                heading.id = `heading-${index}`;
            });
            return tempDiv.innerHTML;
        })();

        return /*html*/ `
        <div class="blog-full-layout">
            <main class="blog-main blog-main--full-post">
                <div class="blog-post-nav">
                    <button onclick="window.location.hash = ''; window.location.reload();" class="blog-post-nav__back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 12H5"/>
                            <path d="M12 19l-7-7 7-7"/>
                        </svg>
                        Back to all posts
                    </button>
                </div>
                <article class="blog-post blog-post--full">
                    <h1 class="blog-post__title">${post.title}</h1>
                    <div class="blog-post__meta">
                        <div class="blog-post__meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                            </svg>
                            <span>Published on ${post.date}</span>
                        </div>
                        <div class="blog-post__meta-divider">|</div>
                        <div class="blog-post__meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>Classified in ${post.categories.map(cat => `<span class="blog-post__category">${cat}</span>`).join(', ')}</span>
                        </div>
                        <div class="blog-post__meta-divider">|</div>
                        <div class="blog-post__meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span>${post.readTime} min read</span>
                        </div>
                    </div>
                    <div class="blog-post__content">
                        ${contentWithIds}
                    </div>
                </article>
            </main>
            ${headings.length > 0 ? `
                <aside class="blog-toc">
                    <div class="blog-toc__content">
                        <h3 class="blog-toc__title">Table of Contents</h3>
                        <nav class="blog-toc__nav">
                            ${headings.map(heading => `
                                <a href="#${heading.id}" class="blog-toc__link blog-toc__link--level-${heading.level}" onclick="event.preventDefault(); document.getElementById('${heading.id}')?.scrollIntoView({behavior: 'smooth', block: 'start'});">
                                    ${heading.text}
                                </a>
                            `).join('')}
                        </nav>
                    </div>
                </aside>
            ` : ''}
        </div>
        `;
    };

    const renderPostList = () => {
        if (postsToRender.length === 0) {
            return `
                <main class="blog-main">
                    <div class="no-posts">
                        <h2>No posts found in this category.</h2>
                        <a href="/categories" class="blog-post-nav__back">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 12H5"/>
                                <path d="M12 19l-7-7 7-7"/>
                            </svg>
                            Back to all Categories
                        </a>
                    </div>
                </main>
            `;
        }

        return /*html*/ `
        <main class="blog-main">
            ${category ? `
                <div class="blog-post-nav">
                    <a href="/blog" class="blog-post-nav__back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 12H5"/>
                            <path d="M12 19l-7-7 7-7"/>
                        </svg>
                        Back to all posts
                    </a>
                </div>
            ` : ''}
            ${tag ? `
                <div class="blog-post-nav">
                    <a href="/blog" class="blog-post-nav__back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 12H5"/>
                            <path d="M12 19l-7-7 7-7"/>
                        </svg>
                        Back to all posts
                    </a>
                </div>
            ` : ''}
            ${postsToRender.map((post, index) => `
                <article class="blog-post ${index < postsToRender.length - 1 ? 'blog-post--with-border' : ''}">
                    <h2 class="blog-post__title">${post.title}</h2>
                    <div class="blog-post__meta">
                        <div class="blog-post__meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                            </svg>
                            <span>Published on ${post.date}</span>
                        </div>
                        <div class="blog-post__meta-divider">|</div>
                        <div class="blog-post__meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>Classified in ${post.categories.map(cat => `<a href="/blog?category=${encodeURIComponent(cat)}" class="blog-post__category">${cat}</a>`).join(', ')}</span>
                        </div>
                        <div class="blog-post__meta-divider">|</div>
                        <div class="blog-post__meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span>${post.readTime} min read</span>
                        </div>
                    </div>
                    <p class="blog-post__excerpt">${post.excerpt}</p>
                    <a href="#${post.slug}" class="blog-post__read-more" onclick="setTimeout(() => window.location.reload(), 100)">
                        Read the full text &raquo;
                    </a>
                </article>
            `).join('')}
        </main>
    `;
    }

    // Add scroll spy functionality for TOC
    if (currentPost) {
        setTimeout(() => {
            const tocLinks = document.querySelectorAll('.blog-toc__link');
            const headings = document.querySelectorAll('[id^="heading-"]');
            
            if (tocLinks.length > 0 && headings.length > 0) {
                const observerOptions = {
                    rootMargin: '-20% 0px -80% 0px',
                    threshold: 0
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const id = entry.target.id;
                        const tocLink = document.querySelector(`a[href="#${id}"]`);
                        
                        if (entry.isIntersecting) {
                            // Remove active class from all links
                            tocLinks.forEach(link => link.classList.remove('active'));
                            // Add active class to current link
                            if (tocLink) tocLink.classList.add('active');
                        }
                    });
                }, observerOptions);
                
                headings.forEach(heading => observer.observe(heading));
            }
        }, 100);
    }

    return /*html*/ `
        <div class="blog-layout ${currentPost ? 'blog-layout--full-screen' : ''}">
            ${currentPost ? '' : renderSidebar()}
            ${currentPost ? renderFullPost(currentPost) : renderPostList()}
        </div>
    `;
});

/***/ })

}]);
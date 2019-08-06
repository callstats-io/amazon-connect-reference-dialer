# Step 1: Install callstats.io Custom Dialer
1. Login to your salesforce account and make sure your session has not timed out. 
2. Install the unmanaged package: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t2o000000ducF
3. If there is a conflict in the package then click on “do not install”
   If prompt warning of app not part of Salesforce AppExchange partner select the checkbox
4. Select install for all users. 
5. Click “Install now”

# Step 2: Configure Lightning Experience
1. From your salesforce dashboard, click on “Setup” on top right corner and select “Setup”
2. Type “App manager” in quick find and select App Manager
3. Find the “Sales Console” row from the list and select the “Edit” option from the drop-down arrow on the right corner
4. Select the “Utility Items” from the left side menu
5. Click on “Add Utility Item” and select “Open CTI Softphone” from the drop down 
6. Change the Label if necessary and click “Save” button.
7. Click on the “Back” button in the top-right corner (not browser’s back button).
8. Type Visualforce” in quick find and select Visualforce Pages
9. Find and select the “custom_dialer” row from the list, and then click on the “Preview” button
10. New browser tab will open with the URL of this page. It’s going to be in this format: `https://amazonconnect.someInstance.visual.force.com/apex/custom_dialer`
11. Remove the “/apex/custom_dialer” part and the remaining `https://amazonconnect.someInstance.visual.force.com` will be the “Origin URL” in our Amazon Connect configuration
12. From AWS Console, select Amazon Connect service and then select your Amazon Connect instance
13. Select “Application Integration” on the left-hand side
14. Click on “Add origin” link and enter the origin URL
15. Click “Add” 

# Step 3: Setup callstats.io Custom Dialer
1. From the Setup screen, type “Call Centers” in quick find and select “Call Centers”.
2. Click on “Continue”.
3. Select “callstats OpenCTI Adapter” and click “Edit” when the page opens
4. In “Connecting settings” fill in your 
    - Amazon Connect CCP URL - Your Amazon Connect CCP URL e.g. callstatsio.awsapps.com
    - application ID - Your application ID from callstats.io 
    - application Secret - Your application secret from callstats.io 
5. Click “Save”
6. Click on 'Manage Call Center Users' at the bottom of the page 
7. Click on “Add more users”
8. Apply the necessary filters and find the users you would like to add 
9. Select the users and click on “Add to Call Center”

# Step 4: Using callstats.io Custom Dialer
1. On the top-left corner, click on the dot-matrix button to open the App Launcher.
2. Select the “Sales Console” application. 
3. The Phone button should be displayed in the bottom-left corner. Click on the Phone button to open the softphone pop-up.
4. Click on “Sign in” button and sign in to your Amazon Connect account
5. Set your status to “Available” 
6. You can now receive inbound calls or make outbound calls. 
7. Optional: Click on “Settings” icon to change your phone settings or make a connectivity test

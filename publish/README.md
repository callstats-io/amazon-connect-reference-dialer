# Install Callstats.io Custom Dialer
1. Install the unmanaged package: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t2p000000Y4Wb
2. Select install for all users

# Configure Lightning Experince
- Login into your Salesforce instance and open Setup
- From the Setup screen, type App Manager in Quick find filled and select App Manager
- Click on drop-down arrow associated to Sales Console and select Edit.
- Next in the Lightning App Builder choose Utility Items from the left-side menu.
- Click 'Add Utility Item' and select Open CTI Softphone
- Change the Label in necessary and click on the Save button.
- Click on the Back button in the top-right corner (not browser’s back button).

# Set Up CallStats.io Custom Dialer
- From the Setup screen, type Call Center in Quick find filled and select Call Center
- Click on CallStats OpenCTI Adapter
- On Call Center Detail click 'Edit'
- In Connecting settings fill in your CCP URL, application ID and application Secret
- Hit save
- On Call Center Users at the end of the page click 'Manage Call Center Users'
- Click 'Add more users' button
- Set filters and click on the Find button. Select the checkbox next to the user and click “Add to Call Center” button.

# Opening up the Callstats.io Custom Dialer
- In the top-left corner, select the dot-matrix button to open the App Launcher
- Select the Sales Console application. The Phone button should be displayed in the bottom-right corner.
- Click on the Phone button to open the softphone pop-up.
- Click on SignIn button and sign in to your Callstats account

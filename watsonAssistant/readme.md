# Creating the Conversational AI
This section describes the process of creating the the Conversational AI using IBM Watson Assistant. This component is responsible for interpreting user queries and generating appropriate responses. A basic dialogue tree for this component has been provided, allowing the core of the Conversational AI to be set up with minimal effort. Once imported this can be customised as necessary, including the implementation of additional dialogues and modifications of existing responses.

## Creating the IBM Watson Assistant
The first step is to create an IBM Watson Assistant service. The process is as follows:

1. From the IBM Cloud homepage navigate to 'Watson Assistant' page
2. Click 'Create'
3. Click the 'Launch Watson Assistant' button
4. Click the 'Assistants' button
5. Click the 'Create assistant' button and give the assistant an approrpiate name (e.g. NextGenShopper)
6. Click 'Create assistant' to finish the creation

For complete instructions, and more information, see https://cloud.ibm.com/docs/assistant?topic=assistant-getting-started

## Importing the dialogue tree
The next step is to import the pre-made dialogue tree which will act as the core for the conversational AI. Before doing this make sure the 'skill-Shopping-Assistant.json' file is downloaded and available to upload.

1. Launch the assistant service created in the previous step
2. Click the 'Skills' tab on the left of the window
3. Click 'Create skill' and select the 'Dialogue skill' option (it is important to select the correct type of skill here, otherwise the import will not work as intended)
4. Click 'Import skill' and upload the 'skill-Shopping-Assistant.json' file
5. Make sure to 'Import everything' when prompted to specify (this will make sure the custom intents as well as conversation flows are imported)
6. Click 'Import' to finish the import

For complete instructions, and more information, see https://cloud.ibm.com/docs/assistant-data?topic=assistant-data-skill-dialog-add

## Linking the dialogue tree to the assistant
The final step is to link the dialogue tree to the assistant created in the first step. This means that the assistant makes use of the pre-defined dialogue tree and can be linked to other services to handle user queries.

1. Launch the assistant created in the first step (this is the named instance of the assistant, rather than just the service)
2. Click the 'Add a dialogue skill' button
3. Select the dialogue skill that was imported on the previous step
4. Confirm

## Modifying the dialogue skill
The dialogue skill can be modified as necessary, allowing for customised repsonses or additional conversational flows to be added. For more information on how to do this see the IBM Watson Assistant documentation. A good starting point would be https://cloud.ibm.com/docs/assistant?topic=assistant-tutorial


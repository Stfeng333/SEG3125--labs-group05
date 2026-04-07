# SEG3125 Lab 10 - Cycler Forever enchanced with a chatbot
- A static website of a bicycle repair shop where users book appointments (HTML, CSS, JavaScript)
- A booking flow (service, staff, date/time, contact, payment demo)
- A Dialogflow CX Messenger widget in `index.html`

Dialogflow CX settings currently used to integrate the chatbot into the website:
- Project ID: `seg3125-lab10-group05`
- Agent ID: `2ac5fdf7-a0e1-4138-b9a8-ebdec4ad01eb`
- Language: `en`
- Chat bubble title: `Rebike Agent`

## Quick start (recommended)

Use a local web server (not double-clicking the HTML file).

### To run the project locally
From inside `SEG3125-lab10-Group05`, run:

```bash
python -m http.server 5500
```

Then open:

- `http://localhost:5500/index.html`

## Requirements

- Internet connection is required for:
	- Bootstrap CDN
	- Bootstrap Icons CDN
	- Dialogflow Messenger script and theme from Google

## Troubleshooting

### Chat bubble does not appear

- Refresh the page (Ctrl+F5)
- Check internet connection
- Open browser DevTools console and look for blocked script/network errors
- Confirm the Dialogflow script URL loads:
	- `https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js`

### Chat bubble appears but bot does not reply

- Verify the Dialogflow CX agent is still active in Google Cloud
- Confirm integration is enabled for web messenger in Dialogflow CX
- If domain restrictions are configured in Dialogflow, add local hostnames:
	- `localhost`
	- `127.0.0.1`

### Page looks broken or unstyled

- Make sure you are running from `http://...`, not `file://...`
- Confirm `styles.css` and `scripts.js` are in the same folder as `index.html`

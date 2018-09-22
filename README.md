# Chrome Extension Gmail Snippets

This extension has a pre-defined list of email templates that you can use, saving time everytime you have to send a new one.

## Get Started

This extension is not yet on Chrome Store. Just make sure to follow the steps below to install it.

### Pre Requesites

You should have [git](https://en.wikipedia.org/wiki/Git) installed on your system.

You should also have [NodeJS](https://nodejs.org/en/) and node package manager `npm` installed.

### Installation

1 - Clone this repo

`git clone https://github.com/tiagoinacio/chrome-extension-gmail-snippets.git`

2 - Install dependencies

First change to the cloned directory:

`cd chrome-extension-gmail-snippets`

Then run the installation process:

`npm i` or `npm install`

3 - Build the project

`npm run build`

By running the previous command, a distribution folder (`dist`) will have the code of the extension that you will need to upload to your Google Chrome.

4 - Go to Chrome Extensions and install the extension

In your browser, go to the following url: `chrome://extensions`. You will have a toggle to enable the *developer mode*. Turn it on. Then, click on ``Load unpacked` and point to the distribution folder previously created by the build command.

5 - Test the extension

Go to [gmail](https://mail.google.com), click on `Compose` to create a new email, and click on the plus sign, right beside the `Send` button.

A list of templates should be loaded, and you should be able to choose the right template for your use case.

## TODO

Following steps would be user defined templates, meaning that a user would be able to upload custom templates.


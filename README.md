# Memory Game

This Memory Game was developed with a simple and charming food theme.
Every card when clicked will reveal a little food icon.
The idea is to be quick and easy, the timer adds enough pressure for the game to be challenging yet enjoyable.
Just match the cards within the time limit and you will have victory!

[Click here to try it out](https://saltta.github.io/memorygame/)

![Responsive Mockup](assets/images/responsive.png)

# Features

## Header

- The header shows the title of the game.
- It is big and bold to draw attention to itself once the game is opened.

## Game Stats

- The stats sit below the header and above the interactive part of the game.
- It displays how many seconds you have left to finish and how many cards you have flipped.

## Cards

- A total of 12 cards are displayed in 3 columns.
- Their backs are facing up until clicked on and they rotate revealing a different image.

## Footer

- The footer displays a quick instruction on what the objective is.

## Overlays

- Messages that prompt the player to start or restart the game.

# Testing

## Validators

I used the following validators to make sure there were no syntax errors in the project:

- The W3C Markup Validation Service:
- The W3C CSS Validation Service:
- JSHint:

## Lighthouse

I also checked the performance of the page using Chrome's Lighthouse.

- Mobile Results:
- Desktop Results:

## Bugs

After deploying via GitHub Pages I noticed my favicon was not being displayed in the deployed page although it worked on the test server.

This was fixed by adding this line of code:

    <link rel="shortcut icon" href="favicon.ico" />

The game was tested on Windows 10 and MacOS in Firefox and Chrome, as well as an Adroid phone running a Chrome based browser, there were no bugs reported.


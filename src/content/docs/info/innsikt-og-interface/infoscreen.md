---
title: "Online Infoscreen"
---

Om du skrur på Infoscreen i [Notifier](https://wiki.online.ntnu.no/info/innsikt-og-interface/notifier/) får du innholdet i Notifier tilpasset en stor skjerm som står på høykant.

## Installasjon

Bruk en ekstra PC, en du ikke trenger til noe annet.

- Installer siste versjon av Ubuntu fra [ubuntu.com/desktop](http://ubuntu.com/desktop)
    - Skriv ned brukernavnet og passordet fra installasjonen!
    - Sett Autologin On når du får spørsmål om det
- Åpne "System Settings"
    - Displays -> Set rotation to clockwise
    - Brightness & Lock -> Never turn screen off
    - Appearance -> Behavior -> Auto-hide the launcher
- Åpne "Update Manager"
    - Settings -> Never automatically check updates
    - Settings -> Never notify me of a new Ubuntu version
- Åpne "Software Updater"
    - Install updates this once
- Åpne en terminal
    - **sudo apt-get install openssh-server python-xlib**
- Installer Google Chrome fra [chrome.google.com](http://chrome.google.com)
    - Ikke engang tenk på å bruke Chromium i stedet, den lagger bak på støtte for CSS3, ting vil se stygt ut.
- Åpne Chrome
    - Settings -> Set Chrome as default browser
    - Settings -> Turn off language suggestions
    - Settings -> Do not offer to save passwords
    - Settings -> On startup, open the new tab page (this is important for kiosk mode to work properly)
    - Installer Notifier fra [Chrome Web Store](http://bit.ly/NotifierForChrome)
    - Online Notifier Options -> Enable Infoscreen
- Launcheren (sidebaren i Ubuntu)
    - Lås Chrome-ikonet til Launcheren
    - Andre apps du kanskje vil låse til launcheren: System Settings, Startup Applications, Software Updater, Terminal
    - Fjern unødvendige ikoner, ja, Firefox også
- Putt dette python-scriptet i hjemmemappen din, kall det **move_mouse_once.py**
    - \#!/usr/bin/python
    - from Xlib import X, display
    - d = display.Display()
    - s = d.screen()
    - root = s.root
    - \# move the mouse the fuck outta here
    - root.warp_pointer(5000,5000)
    - d.sync()
- Åpne "Startup Applications"
    - Add **google-chrome --kiosk**
    - Add **python ~/move_mouse_once.py**
- **sudo reboot**
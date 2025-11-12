---
title: "IRC"
---

Lynguide
--------

Windows: Åpne terminal

-   Last ned [putty][] og gjør følgende i puttys meny:
    -   Translation: Velg **UTF-8** fra rullegardinen
    -   Session - Host Name: Skriv inn
        “dittNTNUbrukernavn@caracal.stud.ntnu.no” i feltet
    -   Session - Saved Sessions: Skriv inn et navn, f.eks. caracal i
        feltet og trykk save

Mac / Linux: Åpne terminal

    ssh dittNTNUbrukernavn@caracal.stud.ntnu.no

Åpne Irssi

    screen irssi

Koble til \#online

    /connect -ssl irc.freenode.net
    /join #online

Utdypende
---------

### Termer
|Term|Forklaring|
|---|---|
|Terminal|Kalles også shell, er et tekstlig brukergrensesnitt mot alt i operativsystemet ditt|
|SSH|Secure Shell, tilkobling til en terminal på en annen maskin|
|Irssi|Internet Relay Chat (IRC) -klient for terminal|
|Screen|Ny instans av terminal som legger seg oppå forrige terminal, den forrige kjører fortsatt|
|Caracal|En av NTNU ITs servere, med shelltilgang kan du blant annet finne brukerområdet ditt på folk.ntnu.no|

### Irssi
|Viktigst|
|Bytte mellom vinduer|Alt+0-9 eller Escape, 0-9|
|Bytte nickname|/nick NyttNickName|/ni NyttNickName|
|Se navn i en kanal|/names|/n|
|Skru på logging til ~/irclogs/|/SET autolog ON|

|Kanaler og servere|
|---|---|
|Joine annen kanal|/join #AnnenKanal|/j #AnnenKanal|
|Koble til enda en server|/connect irc.tilfeldigserver.lol|
|Koble til en kanal når du er tilkoblet flere servere|/join -freenode #online|
|Autojoin server|/server ADD -auto -network Freenode irc.freenode.net|
|Autojoin kanal|/channel ADD -auto #online Freenode|


|Vinduer|
|---|---|
|Lage nytt vindu|/window new|/wn|
|Flytte innhold mellom vinduer|/window move up/down|
|Endre størrelsen på vindu|/window size 11|
|Lukke vindu|/window close|/wc|


|Scripts og oppsett|
|---|---|
|Få opp farger på navn|/load nickcolor.pl|
|Skru på "audible bell"|CTRL+a+g|
|Lagre oppsettet ditt|/save|

### Irssi Scripts

Scripts legges i
<sub>/.irssi/scripts/\\ eller</sub>/.irssi/scripts/autorun/  
En enkel måte å laste ned et Irssi Script og legge det i autorun-mappen:

    cd ~/.irssi/scripts/autorun/
    wget http://primitive.im/misc/colornick.pl
    wget http://scripts.irssi.org/scripts/nicklist.pl

### Irssi Themes

Themes legges ~/.irssi/scripts/ eller ~/.irssi/scripts/autorun/
En enkel måte å laste ned et Irssi Script og legge det i autorun-mappen:
  
cd ~/.irssi/  
wget http://www.irssi.org/themefiles/spookydoom.theme  
screen irssi ELLER screen -dr  
/set theme spookydoom  
/save

### Screen

Når du skriver “screen” i en terminal lager du en ny instans, “en ny
skjerm”. Du ble bedt om å skrive “screen irssi” slik at irssi starter i
en ny skjerm, du kan da fremdeles gjøre andre ting i screenen som kjører
i bakgrunnen. Se under for å vite hvordan.


| Hva| Hvordan|
|---|---|
|Lukke screenen du er i| exit|
|Koble fra screenen med irssi eller annet program som vil fortsette å
kjøre| Ctrl+A, D|
|Koble til forrige screen, med mulighet for “multiplayer”| screen -x|
|Koble til forrige screen, og koble fra andre terminaler inne på samme screen | screen -dr|
|Liste over kjørende screens | screen -l|

  [putty]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
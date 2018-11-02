---
title: "Drift- og utviklingskomiteen"
---

DotKom til daglig
-----------------

DotKoms hverdag går ut på å legge til rette for andre komitéer i form av
hele systemer og support. Vi prøver hele tiden å forbedre web-en vår i
form av nye nyttige features og løsninger.  
Vi jobber mye med å gi folk en god brukeropplevelse når de benytter
tjenestene våre og satser på god og stabil hardware som gir oss en
sikker platform med flere lag redundans.

Hver onsdag samles komitémedlemmene til arbeidskveld hvor det kodes,
spises pizza og rambodriftes til heavy syremusikk. Vi liker også Rihanna
=D  
Dessuten klikker vi ikke i vinkel om du tilfeldigvis skulle komme til å
ramle inn på kontoret uten å vite at det er møte :))) **host**

En typisk [[dotkominnkalling060411|dotkom-møteinnkalling]]

Historie
--------

Drifts- og Utviklingskomitéen ble opprettet høsten 2004 under navnet
dotKom. Før det var det den i HS som hadde mest peiling på websider som
laget og vedlikeholdt Online sine websider.

I de tidlige år kjørte alle tjenester og systemer enten på eldgamle
bokser rasket ut av søppelcontainere eller på IDI sine systemer. Dette
fungerte overraskende godt, men denne tiden er forbi og dotkom har nå en
god og stabil serverpark med forholdsvis ny hardware.

Online sine nettsider startet som mange andre med et hjemmelaget
php-system, dette ble opprinnelig utviklet av Patrick Mostad rundt 2002.
Dette systemet ble enten kraftig modifisert eller endret da dotKom ble
opprettet. Sommeren 2006 krasjet harddisken på webserveren til Online,
og det fantes ingen backup. DotKom hadde såvidt begynt på en
testhjemmeside for en ny hjemmelaget PHP-løsning med et nytt design, og
denne ble etterhvert rullet ut, slik at deler av nettsidene var oppe til
fadderuka begynte. Dette systemet var laget av Glenn Ruben Bakke og
Asbjørn Fellinghaug? Denne nettsiden ble videreutviklet frem til ca.
høsten 2007. dotKom bestemte seg for å modernisere utviklingen med
python-rammeverket Turbogears, som ble værende i drift i et år eller to
før Alexander Bjerkan virkelig tok i et tak og skrev om alt til Django i
løpet av påskeferien 2009.

Høsten 2010 og våren 2011 ble det året da dotKom endelig fornyet mye av
maskinvaren i serverparken sin. Gamle 133mhz-servere ble byttet ut med
nye rack-maskiner, hvorav en tjener (morgan), en switch, en del disker
og et 42U rackskap ble donert til oss våren 2009 av Ståle Forbregd.

Høsten 2011 og våren 2012 gikk Ståle igjen av skaftet og donerte en hel
rekke med maskiner. Parken til Online ble utvidet nok en gang til å huse
rundt ti maskiner. Puppet ble tatt i bruk for tjenerkonfigurasjon og
Online fikk sine første DNS-tjenere.  
I samme tidsrom gikk dotkom over fra lokal Git og Redmine til Github for
versjonkontroll, og utviklingsregimet ble en del strengere. Pull
requests og testing stod i sentrum.

Utvikling
---------

Onlines websider er utviklet i rammeverket [Django][]. Django bruker
[Python][] som programmeringsspråk og vårt valg av databasesoftware er
PostgreSQL.  
Kildekoden ligger åpent tilgjengelig på GitHub: [dotkom/onlineweb4](https://github.com/dotKom/onlineweb4)


Denne wikien er et open source-prosjekt kalt Redmine og er skrevet i
Ruby on Rails. Vår implementasjon av redmine innholder ymse selvlagde
script for adgangshåndtering mot LDAP samt en egen plugin til [[emner]].


Drift
-----

Online sin serverpark holder til i kjelleren på IT-bygget og driftes av
dotkom. Vi har i løpet av høsten 2010 konvertert alle våre servere til
rack, og eier vårt eget rackskap.  
Tradisjonelt er alle Onlines servere oppkalt etter sprit, og for tiden
er disse serverne aktive:

-   Morgan (apache, postgres, ldap, django, RoR, secondary DNS)
-   Absint (intern utviklingsboks og sandbox)
-   Fernet (nfs, backuppc)
-   Dworek (postfix, sympa)
-   Grouse (munin, mrtg)
-   Bacardi (spill)
-   Draug (infoskjerm)
-   Highland (puppetmaster)
-   Kahlua (primary DNS)
-   Moonshine (Bygg)

Andre bokser hos oss:

-   Coastguard (Tihlde drift)

Av gamle servere kan nevnes:

-   Jameson (web)
-   Tequila (fil)
-   Ouzo (config, ldap)
-   Minttu (postgres, login)
-   Macallan (midlertidig fil før fernet, gamle jameson sin hw)
-   Titanic (Tihlde drift)

Vi har i tillegg tre tykklienter på [[kontoret]] knyttet til våre
systemer som komitémedlemmer kan bruke.

Alle serverne kjører debian squeeze, tykklientene kjører ubuntu.

  [Django]: http://www.djangoproject.com/
  [Python]: http://python.org/

Medlemmer
---

| År | Leder | Medlemmer  |
| --- | --- | :---:  |
|2016-2017| *Håkon Solbjørg* | Christian Duvholt, Nils Herde, Kristoffer Andreas Dalby, Kristian Selvik Ekle, Iver Egge Asperud, Thomas Gautvedt, Aleksander Skraastad, Hans Sandbu, Aigars Tumanis, Anders Larsen, Andrea Nornes, Jarle Trollebø, Katrine Jordheim, Martin Lunde, Niklas Hole, Ole Anders Stokker, Aslak Hollund, Dora Oline Eriksrud, Jakob Westermoen, Thomas Lund Mathisen, Torjus Iveland, Zawadi Svela  |
|2015-2016| *Nils Herde* | |
|2014-2015| *Nils Herde* | |
|2013-2014| /1.*Nils Herde* | /5.Christian Strand Young /7.Espen Jacobsson /6.Håvard Slettvold /3.Magnus Dysthe /3.Tor Håkon Bonsaksen /3.Jonas Svarvaa /2.Kristoffer Dalby /2.Nils Herde /2.Edgar Vedvik /2.Thomas Gautvedt /2.Iver Asperud /1.Tri M. Nguyen /1.Rikke Rye-Holmboe /1.Christian Duvholt /1.Nicolas A. Tonne /1.Aleksander Skraastad |
|2012-2013| /3.*Christian Strand Young* | /3.Sigurd Fosseng /2.Torkil Rein Gustavsen /1.Michael Johansen |
|2011-2012| /2.Hanne Gunby | /6.Dag Olav Prestegarden /3.Roy Sindre Norangshol /5.Jon-Terje Kalvatn /1.Håvard Kindem /1.Helle Grimnes |
|2010-2011| | /3.Lorents Gravås| 
|2009-2010| /3.*Dag Olav Prestegarden* | /6.Magnus Romnes /4.Martin Syvertsen |
|2008-2009| | | /5.Glenn Ruben Bakke /2.Alexander Bjerkan /2.Anders Brujordet /3.Aleksander Grande |
|2007-2008| | | /4.Asbjørn Fellinghaug Rune Vikestad |
|2006-2007| /3.*Asbjørn A. Fellinghaug* | Naimdjon Takhirov Martin Rødvand Håvard Sørbø |
|2005-2006| | /2.Anders Berre /2.Bjørn Christiansen |
|2004-2005| | |
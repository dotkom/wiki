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
| --- | --- | :---: |
|2023-2024| *Jo Gramnæs Tjernshaugen* | Henrik Skog, Henrik Hørlück Berg, Sondre Alfnes, Mats Jun Larsen, Billy Steen Barrett, Mads Bårnes, Nora Langli, Hanna Lunna, Jonas Hole, Erlend Løken Sæveraas, Jennica Duong, Andre Ferdinand Klarpås, Eline Fondevik, Victoria Børseth, Brage Andreas Hoven, Ragnhild Moe Danielsen
|2022-2023| Mats Jun Larsen | ? |

| År | Leder | Styremedlem | Medlemmer  |
| --- | --- | ---  | :---: |
|2021-2022| *Vigdis-Irene Steinsund* | *Thomas Hasvold* | Anhkha Vo, Amund Lunke Røhne, Tobias Slettmoen Kongsvik, Johannes Kvamme, Monika Halina, Andre Steinar Ken Furnes, Julian Grande, Anna Irene Andresen, Gerhard Gustavsen, Carl Smestad, Joakim Fremstad |
|2020-2021| *Vigdis-Irene Steinsund* | *Monika Muzyk* | Anhkha Vo, Amund Lunke Røhne, Tobias Slettmoen Kongsvik, Johannes Kvamme, Monika Halina, Andre Steinar Ken Furnes, Julian Grande, Anna Irene Andresen, Gerhard Gustavsen, Carl Smestad, Joakim Fremstad |



| År | Leder | Medlemmer  |
| --- | --- | :---:  |
|2019-2020| *Ole Anders Stokker* | |
|2018-2019| *Jakob Westemoen* | |
|2017-2018| *Aslak Hollund* | |
|2016-2017| *Håkon Solbjørg* | Christian Duvholt, Nils Herde, Kristoffer Andreas Dalby, Kristian Selvik Ekle, Iver Egge Asperud, Thomas Gautvedt, Aleksander Skraastad, Hans Sandbu, Aigars Tumanis, Anders Larsen, Andrea Nornes, Jarle Trollebø, Katrine Jordheim, Martin Lunde, Niklas Hole, Ole Anders Stokker, Aslak Hollund, Dora Oline Eriksrud, Jakob Westermoen, Thomas Lund Mathisen, Torjus Iveland, Zawadi Svela  |
|2015-2016| *Nils Herde* | |
|2014-2015| *Nils Herde* | |


| År        | Leder                    | Medlemmer              |                   |                     |                    |                     |                  |                   |                       |                       |                   |                   |                |                       |                   |                  |                      |   |   |
|-----------|--------------------------|------------------------|-------------------|---------------------|--------------------|---------------------|------------------|-------------------|-----------------------|-----------------------|-------------------|-------------------|----------------|-----------------------|-------------------|------------------|----------------------|---|---|
| 2013-2014 | *Nils Herde*             | Christian Strand Young | Espen Jacobsson   | Håvard Slettvold    | Magnus Dysthe      | Tor Håkon Bonsaksen | Jonas Svarvaa    | Kristoffer Dalby  | Nils Herde            | Edgar Vedvik          | Thomas Gautvedt   | Iver Asperud      | Tri M. Nguyen  | Rikke Rye Holmboe     | Christian Duvholt | Nicolas A. Tonne | Aleksander Skraastad |   |   |
| 2012-2013 | *Christian Strand Young* | Christian Strand Young | Espen Jacobsson   | Håvard Slettvold    | Magnus Dysthe      | Tor Håkon Bonsaksen | Jonas Svarvaa    | Kristoffer Dalby  | Nils Herde            | Edgar Vedvik          | Thomas Gautvedt   | Iver Asperud      | Sigurd Fosseng | Torkil Rein Gustavsen | Michael Johansen  |                  |                      |   |   |
| 2011-2012 | *Christian Strand Young* | Christian Strand Young | Espen Jacobsson   | Håvard Slettvold    | Magnus Dysthe      | Tor Håkon Bonsaksen | Jonas Svarvaa    | Hanne Gunby       | Dag Olav Prestegarden | Roy Sindre Norangshol | Jon Terje Kalvatn | Håvard Kindem     | Sigurd Fosseng | Torkil Rein Gustavsen | Helle Grimnes     |                  |                      |   |   |
| 2010-2011 | *Christian Strand Young* | Christian Strand Young | Espen Jacobsson   | Håvard Slettvold    | Lorents Gravås     |                     |                  | Hanne Gunby       | Dag Olav Prestegarden | Roy Sindre Norangshol | Jon Terje Kalvatn |                   | Sigurd Fosseng |                       |                   |                  |                      |   |   |
| 2009-2010 | *Dag Olav Prestegarden*  | Christian Strand Young | Espen Jacobsson   | Håvard Slettvold    | Lorents Gravås     | Magnus Romnes       | Martin Syvertsen |                   | Dag Olav Prestegarden | Roy Sindre Norangshol | Jon Terje Kalvatn |                   |                |                       |                   |                  |                      |   |   |
| 2008-2009 | *Dag Olav Prestegarden*  | Glenn Ruben Bakke      | Espen Jacobsson   | Håvard Slettvold    | Lorents Gravås     | Magnus Romnes       | Martin Syvertsen | Alexander Bjerkan | Dag Olav Prestegarden | Anders Brujordet      | Jon Terje Kalvatn | Aleksander Grande |                |                       |                   |                  |                      |   |   |
| 2007-2008 | *Dag Olav Prestegarden*  | Glenn Ruben Bakke      | Espen Jacobsson   | Asbjørn Fellinghaug | Rune Vikestad      | Magnus Romnes       | Martin Syvertsen | Alexander Bjerkan | Dag Olav Prestegarden | Anders Brujordet      | Jon Terje Kalvatn | Aleksander Grande |                |                       |                   |                  |                      |   |   |
| 2006-2007 | *Asbjørn Fellinghaug*    | Glenn Ruben Bakke      | Naimdjon Takhirov | Asbjørn Fellinghaug | Martin Rødvand     | Magnus Romnes       | Martin Syvertsen | Håvard Sørbø      | Dag Olav Prestegarden |                       |                   | Aleksander Grande |                |                       |                   |                  |                      |   |   |
| 2005-2006 | *Asbjørn Fellinghaug*    | Glenn Ruben Bakke      | Anders Berre      | Asbjørn Fellinghaug | Bjørn Christiansen | Magnus Romnes       |                  |                   |                       |                       |                   |                   |                |                       |                   |                  |                      |   |   |
| 2004-2005 | *Asbjørn Fellinghaug*    | Glenn Ruben Bakke      | Anders Berre      | Asbjørn Fellinghaug | Bjørn Christiansen | Magnus Romnes       |                  |                   |                       |                       |                   |                   |                |                       |                   |                  |                      |   |   |
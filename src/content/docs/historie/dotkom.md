---
title: "Drifts- og utviklingskomiteen"
---

## Dotkom til daglig

Dotkoms hverdag går ut på å legge til rette for andre komiteer i form av hele systemer og support. Vi prøver hele tiden å forbedre systemene våre, enten det er nye features og løsninger eller hele rewrites. Vi jobber mye med å gi folk en god brukeropplevelse når de benytter tjenestene våre og satser på god og stabil hardware som gir oss en sikker platform med flere lag redundans.

Hver onsdag samles komitémedlemmene til arbeidskveld hvor det kodes, spises pizza, og snakkes. Vi alle gleder oss til neste hyttetur og blåtur :)

## Historie

Drifts- og utviklingskomiteen ble opprettet høsten 2004 med forkortelsen "dotKom". Før det var det den i HS som hadde mest peiling på nettsider som laget og vedlikeholdt Onlines nettsider.

I de tidlige år kjørte alle tjenester og systemer enten på eldgamle bokser rasket ut av søppelcontainere eller på IDIs systemer. Dette fungerte overraskende godt, men denne tiden er forbi.

Onlines nettsider startet med et hjemmelaget PHP-system. Dette ble opprinnelig utviklet av Patrick Mostad rundt 2002. Dette systemet ble enten kraftig modifisert eller endret da drifts- og utviklingskomiteen ble opprettet i høsten 2004.

Sommeren 2006 krasjet harddisken på webserveren til Online, og det fantes ingen backup. Dotkom hadde såvidt begynt på en testhjemmeside for en ny hjemmelaget PHP-løsning med et nytt design, og denne ble etterhvert rullet ut, slik at deler av nettsidene var oppe til fadderuka begynte. Dette systemet var laget av Glenn Ruben Bakke og Asbjørn Fellinghaug (?). Denne nettsiden ble videreutviklet frem til ca. høsten 2007, da dotkom bestemte seg for å modernisere utviklingen med Python-rammeverket "Turbogears". Rammeverket ble værende i drift i et år eller to før Alexander Bjerkan virkelig tok i et tak og skrev om alt til Django i løpet av påskeferien 2009.

Høsten 2010 og våren 2011 ble året da dotkom endelig fornyet mye av maskinvaren i serverparken sin. Gamle 133 MHz-servere ble byttet ut med nye rack-maskiner, hvorav en tjener (Morgan), en switch, en del disker og et 42U rackskap ble donert til oss våren 2009 av Ståle Forbregd. Tradisjonelt er alle Onlines servere oppkalt etter sprit.

Høsten 2011 og våren 2012 gikk Ståle igjen av skaftet og donerte en hel rekke med maskiner. Parken til Online ble utvidet nok en gang til å huse rundt ti maskiner. Puppet ble tatt i bruk for tjenerkonfigurasjon og Online fikk sine første DNS-tjenere. I samme tidsrom gikk dotkom over fra lokal Git og Redmine til Github for versjonkontroll, og utviklingsregimet ble en del strengere. Pull requests og testing stod i sentrum.

I [juni 2012](https://github.com/dotkom/onlineweb4/commit/fac1ce790b6909cca7e4f3cc4c19f41f48006569) startet dotkom med OnlineWeb 4, som er per høst 2024 fortsatt i bruk. OW4 er skrevet i Django med Python, og har med årene blitt en monolitt.

I [mai 2018](https://github.com/dotkom/onlineweb-frontend/commit/a4f617f2849709dea9baf38feb1860b875ea2d05) startet dotkom på OnlineWeb Frontend (OWF), skrevet i React med Javascript. OWF er en frontend for OW4, og er per høst 2024 fortsatt i bruk.

I [oktober 2019](https://github.com/dotkom/vengeful-vineyard/commit/6bcd806ab2adc15c5a78a4939743237052717194) ble Vinstraff startet (da kalt Vengeful Vineyard), som skulle bytte ut gamle RedWine inne på OW4. Vinstraff er skrevet i React med Typescript og backend i FastAPI med Python. Vinstraff ble lansert 22. februar 2024, og er per høst 2024 fortsatt i bruk. Du kan finne Vinstraff på [vinstraff.no](https://vinstraff.no).

I [oktober 2021](https://github.com/dotkom/monoweb/commit/c562481f8a360b6582ca20a474502f21aac1d37f) startet dotkom på OnlineWeb 5, som er den første rewriten av OnlineWeb på mange år. OW5 er skrevet i Next.js med Typescript, og er per høst 2024 fortsatt i utvikling. Du kan finne nyeste development-versjon av OW5 på [web.online.ntnu.no](web.online.ntnu.no).

I [november 2021](https://github.com/dotkom/onlineweb4/pull/2776) migrerte dotkom fra fysiske servere til skybaserte løsninger, deriblant AWS.

Høsten 2023 til våren 2024 måtte dotkom rydde ut de resterende serverene våre, da NTNU ikke tillot å ha servere på Gløshaugen lengre. Per høst 2024 har dotkom ingen fysiske servere.

## Utvikling

Onlines websider er utviklet i rammeverket Django. Django bruker
Python som programmeringsspråk og vårt valg av databasesoftware er
PostgreSQL. Kildekoden ligger åpent tilgjengelig på [GitHub](https://github.com/dotKom/onlineweb4).

Denne wikien er et open source-prosjekt kalt [Wiki](https://github.com/dotkom/wiki) og er laget med Astro og Starlight.

## Drift

Per høst 2024 bruker vi følgede skybaserte tjenester:

-   [Auth0](https://auth0.com/)
-   [AWS](https://aws.amazon.com/)
    -   [RDS](https://aws.amazon.com/rds/)
    -   [EC2](https://aws.amazon.com/ec2)
    -   [VPC](https://aws.amazon.com/vpc/)
    -   [S3](https://aws.amazon.com/s3/)
    -   [ECR](https://aws.amazon.com/ecr/)
    -   [Lambda](https://aws.amazon.com/lambda/)
    -   [Route 53](https://aws.amazon.com/route53/)
    -   [API Gateway](https://aws.amazon.com/api-gateway/)
    -   [KMS](https://aws.amazon.com/kms/)
    -   [Secrets Manager](https://aws.amazon.com/secrets-manager/)
    -   [CloudWatch](https://aws.amazon.com/cloudwatch/)
    -   [DynamoDB](https://aws.amazon.com/dynamodb/)
    -   [SES](https://aws.amazon.com/ses/)
    -   [CloudWatch](https://aws.amazon.com/cloudwatch/)
-   [Docker](https://www.docker.com/)
-   [Doppler](https://doppler.com/)
-   [Google Workspace](https://workspace.google.com/)
-   [Neon](https://neon.dev/)
-   [Vault](https://www.hashicorp.com/products/vault) (self-hosted)
-   [Vercel](https://vercel.com/)

<details>
<summary>Disse serverne har kjørt hos oss:</summary>

Aktiv per 2012:

-   Morgan (Apache, PostgreSQL, LDAP, Django, RoR, secondary DNS)
-   Absint (intern utviklingsboks og sandbox)
-   Fernet (NFS, BackupPC)
-   Dworek (Postfix, Sympa)
-   Grouse (Munin, MRTG)
-   Bacardi (spill)
-   Draug (infoskjerm)
-   Highland (puppetmaster)
-   Kahlua (primary DNS)
-   Moonshine (Bygg)
-   Coastguard (Tihlde drift)

Pensjonert per 2012:

-   Jameson (web)
-   Tequila (fil)
-   Ouzo (config, LDAP)
-   Minttu (PostgreSQL, login)
-   Macallan (midlertidig fil før Fernet, gamle Jameson sin hardware)
-   Titanic (Tihlde drift)

Vi hadde i tillegg tre tykklienter på kontoret knyttet til våre systemer som komitémedlemmer kunne bruke.

Alle serverne kjørte Debian Squeeze, og tykklientene kjørte Ubuntu.

</details>

## Medlemmer

| År | Leder | Medlemmer |
| -- | ----- | --------- |
| 2025-2026 | _Brage Andreas Hoven_ | Henrik Johannes Bjørnstad Skog, Henrik Hørlück Berg, Sondre Alfnes, Daniel Pietrzykowski Sarjomaa, Mads André Bårnes, Nora Wirkola Langli, Brage Baugerød, Jonas Hole, Jo Gramnæs Tjernshaugen, Erlend Løken Sæveraas, Jennica Duong, André Ferdinand Klarpås, Eline Fondevik, Ragnhild Moe Danielsen, Henry Græsberg, Thea Nguyen, Johannes Hansen Aas, Ella Haugland Waal |
| 2024-2025 | _Jo Gramnæs Tjernshaugen_ | Henrik Johannes Bjørnstad Skog, Henrik Hørlück Berg, Sondre Alfnes, Daniel Pietrzykowski Sarjomaa, Mads André Bårnes, Nora Wirkola Langli, Hanna Lunne, Erlend Løken Sæveraas, Jennica Duong, André Ferdinand Klarpås, Eline Fondevik, Victoria Barseth, Brage Andreas Hoven, Ragnhild Moe Danielsen, Andrej Lazic, Emil Fleischmann Salomonsen, Henry Græsberg, Thea Nguyen, Johannes Hansen Aas, Ella Haugland Waal |
| 2023-2024 | _Mats Jun Larsen_ | Anh-Kha Nguyen Vo, Thomas Hasvold, Julian Grande, Magnus Rødseth, Njål Sørland, Henrik Johannes Bjørnstad Skog, Henrik Hørlück Berg, Sondre Alfnes, Billy Steen Barrett, Mads André Bårnes, Nora Langli, Hanna Lunne, Brage Baugerød, Jonas Hole, Jo Gramnæs Tjernshaugen, Erlend Løken Sæveraas, Jennica Duong, André Ferdinand Klarpås, Eline Fondevik, Victoria Barseth, Brage Andreas Hoven, Ragnhild Moe Danielsen |
| 2022-2023 | _Thomas Hasvold_ | |
| 2021-2022 | _Vigdis-Irene Steinsund_ | Thomas Hasvold, Anhkha Vo, Amund Lunke Røhne, Tobias Slettmoen Kongsvik, Johannes Kvamme, Monika Halina, Andre Steinar Ken Furnes, Julian Grande, Anna Irene Andresen, Gerhard Gustavsen, Carl Smestad, Joakim Fremstad, Sondre Alfnes |
| 2020-2021 | _Vigdis-Irene Steinsund_ | Monika Muzyk, Anhkha Vo, Amund Lunke Røhne, Tobias Slettmoen Kongsvik, Johannes Kvamme, Monika Halina, Andre Steinar Ken Furnes, Julian Grande, Anna Irene Andresen, Gerhard Gustavsen, Carl Smestad, Joakim Fremstad |
| 2019-2020 | _Ole Anders Stokker_ | |
| 2018-2019 | _Jakob Westemoen_ | |
| 2017-2018 | _Aslak Hollund_ | |
| 2016-2017 | _Håkon Solbjørg_ | Christian Duvholt, Nils Herde, Kristoffer Andreas Dalby, Kristian Selvik Ekle, Iver Egge Asperud, Thomas Gautvedt, Aleksander Skraastad, Hans Sandbu, Aigars Tumanis, Anders Larsen, Andrea Nornes, Jarle Trollebø, Katrine Jordheim, Martin Lunde, Niklas Hole, Ole Anders Stokker, Aslak Hollund, Dora Oline Eriksrud, Jakob Westermoen, Thomas Lund Mathisen, Torjus Iveland, Zawadi Svela |
| 2015-2016 | _Nils Herde_ | |
| 2014-2015 | _Nils Herde_ | |
| 2013-2014 | _Nils Herde_ | Christian Strand Young, Espen Jacobsson, Håvard Slettvold, Magnus Dysthe, Tor Håkon Bonsaksen, Jonas Svarvaa, Kristoffer Dalby, Nils Herde, Edgar Vedvik, Thomas Gautvedt, Iver Asperud, Tri M. Nguyen, Rikke Rye Holmboe, Christian Duvholt, Nicolas A. Tonne, Aleksander Skraastad |
| 2012-2013 | _Christian Strand Young_ | Christian Strand Young, Espen Jacobsson, Håvard Slettvold, Magnus Dysthe, Tor Håkon Bonsaksen, Jonas Svarvaa, Kristoffer Dalby, Nils Herde, Edgar Vedvik, Thomas Gautvedt, Iver Asperud, Sigurd Fosseng, Torkil Rein Gustavsen, Michael Johansen |
| 2011-2012 | _Christian Strand Young_ | Christian Strand Young, Espen Jacobsson, Håvard Slettvold, Magnus Dysthe, Tor Håkon Bonsaksen, Jonas Svarvaa, Hanne Gunby, Dag Olav Prestegarden, Roy Sindre Norangshol, Jon Terje Kalvatn, Håvard Kindem, Sigurd Fosseng, Torkil Rein Gustavsen, Helle Grimnes |
| 2010-2011 | _Christian Strand Young_ | Christian Strand Young, Espen Jacobsson, Håvard Slettvold, Lorents Gravås |
| 2009-2010 | _Dag Olav Prestegarden_ | Christian Strand Young, Espen Jacobsson, Håvard Slettvold, Lorents Gravås, Magnus Romnes, Martin Syvertsen |
| 2008-2009 | _Dag Olav Prestegarden_ | Glenn Ruben Bakke, Espen Jacobsson, Håvard Slettvold, Lorents Gravås, Magnus Romnes, Martin Syvertsen, Alexander Bjerkan, Dag Olav Prestegarden, Anders Brujordet, Jon Terje Kalvatn, Aleksander Grande |
| 2007-2008 | _Dag Olav Prestegarden_ | Glenn Ruben Bakke, Espen Jacobsson, Asbjørn Fellinghaug, Rune Vikestad, Magnus Romnes, Martin Syvertsen, Alexander Bjerkan, Dag Olav Prestegarden, Anders Brujordet, Jon Terje Kalvatn, Aleksander Grande |
| 2006-2007 | _Asbjørn Fellinghaug_ | Glenn Ruben Bakke, Naimdjon Takhirov, Asbjørn Fellinghaug, Martin Rødvand, Magnus Romnes, Martin Syvertsen, Håvard Sørbø, Dag Olav Prestegarden |
| 2005-2006 | _Asbjørn Fellinghaug_ | Glenn Ruben Bakke, Anders Berre, Asbjørn Fellinghaug, Bjørn Christiansen, Magnus Romnes |
| 2004-2005 | _Asbjørn Fellinghaug_ | Glenn Ruben Bakke, Anders Berre, Asbjørn Fellinghaug, Bjørn Christiansen, Magnus Romnes |

---
title: "Installasjon av IDI sine nettverksprintere på Windows 8"
---

Her kommer en liten guide til hvordan man kan installere og bruke IDI
sine skrivere på Windows 8 maskiner.  
Dette lar seg ikke gjøre på normale måter, og har dermed ikke fungert
fram til nå.  
Guiden skal kunne følges direkte, men dersom du er usikker på noe har
jeg tatt noen screenshots underveis og lagt dem til denne artikkelen. Se
på dem hvis du trenger, men jeg tror guiden skal være såpass detaljert
at det ikke skal være nødvendig :-)

**DENNE ARTIKKELEN ER UTDATERT, HVERTFALL FOR PRINTERNE PÅ P15.
Se Innsida (https://innsida.ntnu.no/utskrift-kopi) for mer info.
**

### Steg 1:

Flytt musa øverst til høyre i skjermen til du får opp menyen. Velg
“Settings” nederst i menyen og deretter “Control Panel” øverst. Åpne
“Devices and printers” fra kontrollpanelet.

### Steg 2:

Klikk “Add a Printer i menylinja øverst i det nye vinduet.
  
h3. Steg 3:
  
Windows vil nå søke etter skrivere på nettverket, dette kan du godt
stoppe for den vil ikke finne noen.  
Velg så ”The printer that I want isn’t listed" (bilde 1) som gir deg
muligheten til å legge til skriver via andre metoder (bilde 2).

### Steg 4:

I neste vindu velger du “Create a new port” og lar dropdown menyen stå
på “Local Port” (bilde 3).

### Steg 5:

Det dukker opp et lite vindu som ber om port name, her skal du skrive
inn nettverksadressen til skriveren som vil være
printhost.idi.ntnu.no\\skrivernavn (bilde 4). Bytt ut skrivernavn med
navnet på skriveren. De viktigste skriverene for oss på Informatikk er
vel p336 i 3. etasje og p436 i 4. etasje på P15.

### Steg 6:

Nå blir du bedt om å velge hvilken skrivermodell Windows skal finne
driver til, her må man bare se på den aktuelle skriveren og finne ut
selv, men p336 og p436 er HP LaserJet P4015x som betyr at man i listen
skal velge HP og deretter “LaserJet 4000 Series PS” (bilde 5).

**OBS! Velg “PS”, ikke “PCL5” eller “PCL6”**

Finner du ikke driveren til den aktuelle skriveren må du trykke på
knappen “Windows Update”. Windows vil da laste ned oversikten over alle
drivere som finnes i Windows Update katalogen, siden dette er rimelig
mange vil det ta litt tid.

Trykk neste, og ikke del skriveren på nettverket når den spør om det.
Kan sikkert også være greit å gi den et skrivernavn som er logisk (som
for eksempel p336 eller liknende).
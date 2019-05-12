---
title: "Skjemaer"
---

### Her finnes PDFer av de ulike kvitterings/bilagsskjemaene til Online. 

[attachment:344]

[attachment:157]

[attachment:185]

[attachment:632 title:"Avtale for utleie av utstyr"]

## Kvitteringsskjema

- Last ned [attachment:344] og åpne det i et PDF-visningsprogram (ikke skriv ut)
- Alle de hvite rutene fylles ut (Bankkort er kun om du har brukt et av Online sine kort)
- For teambuildinger eller lignende støtte må navn på alle deltakere oppføres i kommentarfeltet
- Dato er dato for signert/innsendt skjema og må inneholde årstall
- Alle kvitteringer må legges med (helst i en og samme PDF-fil)Det er viktig at kvitteringen din er gyldig slik at du kan få pengene tilbake raskest mulig. Ser du ord som "kvittering", "receipt", "faktura" eller "invoice" på bilaget ditt skal den være gyldig** Usikker på om du har en gyldig kvittering? Sjekk kravene [i Bokføringsloven §5-1-1](https://lovdata.no/forskrift/2004-12-01-1558/§5-1-1)**  
- Signaturen nederst må være synlig
- Sendes på epost til [kvittering@online.ntnu.no](mailto:kvittering@online.ntnu.no) med komiteen det gjelder i []-klammer i emnefeltet (Eks: [Trikom] Kvittering for trivsel)
- Meld fra til økonomiansvarlig i din komité

Vi setter veldig stor pris på synlige kvitteringer, enten skannet med en dedikert skanner, eller skanner-apper til telefon (f.eks. [CamScanner](https://www.camscanner.com/) eller [Genius Scan](https://www.thegrizzlylabs.com/genius-scan/), begge til både Android og iOS).

For å få kvitteringer i samme PDF-fil som skjemaet åpner du PDFen, og velger fra menylinjen: Rediger --> Sett inn --> Side fra fil

### Slå sammen signatur, utfylt kvitteringsskjema og kvitteringer
Dette 100% legite [scriptet](https://pastebin.com/adNzpTxb) legger sammen kvitteringer, utfylt kvitteringsskjema og signatur til en bestemt fil.

### LaTeX

Dersom man ikke har en PDF-klient som er så glad i å merge PDF-filer så kan man enkelt gjøre det i LaTeX også:

Legg filene `kvittering.pdf` og `skjema.pdf` i samme mappe som en fil `main.tex` med dette innholdet:

```
\documentclass{article}
\usepackage{pdfpages}
\begin{document}
\includepdf[pages={1}]{skjema.pdf}
\includepdf[pages={1}]{kvittering.pdf}
\end{document}
```

Deretter kan du kjøre kommandoen `pdflatex main.tex`. Alternativt er det mulig å opprette et nytt prosjekt i ShareLatex.com e.l. og gjøre det samme der.
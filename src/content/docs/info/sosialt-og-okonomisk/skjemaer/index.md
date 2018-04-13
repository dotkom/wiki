---
title: "Skjemaer"
---

### Her finnes PDFer av de ulike kvitterings/bilagsskjemaene til Online. 

[attachment:344]

[attachment:157]

[attachment:185]

## Kvitteringsskjema

- Alle de hvite rutene fylles ut (Bankkort er kun om du har brukt et av Online sine kort)
- Alle kvitteringer må legges med (helst i en og samme PDF-fil) 
- Signaturen nederst må være synlig
- Sendes på epost til [kvittering@online.ntnu.no](mailto:kvittering@online.ntnu.no) med komiteen det gjelder i []-klammer i emnefeltet (Eks: [Trikom] Kvittering for trivsel)
- Meld fra til økonomiansvarlig i din komité

Vi setter veldig stor pris på synlige kvitteringer, enten skannet med en dedikert skanner, eller skanner-apper til telefon (f.eks. [CamScanner](https://www.camscanner.com/) eller [Genius Scan](https://www.thegrizzlylabs.com/genius-scan/), begge til både Android og iOS).

For å få kvitteringinger i samme PDF-fil som skjemaet åpner du PDFen, og velger fra menylinjen: Rediger --> Sett inn --> Side fra fil

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
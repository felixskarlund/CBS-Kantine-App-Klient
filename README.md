# CBS Kantine App - Klient
Klientsiden av CBS Kantine App

## Kravspesifikation

### Server

S1 : Server skal kunne validere login basert på et hashet passord 

S2 : Server skal kunne adskille elev og kantinemedarbeider ved login

S3 : Serveren skal kunne opprette en bruker 

S4 : Serveren skal utstille et API, som kan trekke på serverens funksjonalitet. API’et skal dekke følgende funksjonaliteter:

- En elev skal kunne opprette seg som bruker
- En elev/kantinepersonale skal kunne logge inn/ut
- En elev skal kunne adgang til liste med priser og vareinformasjon
- En elev skal kunne bestille varer fra sortimentet
- Kantinepersonalet skal kunne se en liste over alle bestillinger

S5 : Serveren skal kunne logge alle transaksjoner

### Klient

K1 : Klienten skal utstille et login/logout

K2 : Klienten skal kunne opprette en bruker

K3 : Klienten skal utstille en meny med varer og tilhørende beskrivelse og pris

K4 : Klienten skal kunne tillate en elev å bestille varer

K5 : Klienten skal kunne tillate en elev å se egne tidligere bestillinger

K6 : Klienten skal kunne tillate kantinepersonale å se liste over alle bestillinger

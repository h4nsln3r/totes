# Merch & Stripe

Merch-sektionen visar T-shirt och Tote bag. "Köp" öppnar en Stripe Payment Link så kunden kan betala och ange adress – ingen egen backend krävs.

## Så sätter du upp Stripe

1. **Skapa konto** på [stripe.com](https://stripe.com) om du inte har det.

2. **Skapa produkter** (Stripe Dashboard → Products → Add product):
   - **Totes T-shirt** – pris t.ex. 299 kr, bild (valfritt).
   - **Totes Tote Bag** – pris t.ex. 199 kr, bild (valfritt).

3. **Skapa Payment Link** för varje produkt:
   - Öppna produkten → "Create payment link".
   - Aktivera **"Collect shipping address"** så du får adress för utskick.
   - Spara länken (t.ex. `https://buy.stripe.com/...`).

4. **Lägg länkarna i projektet**:
   - Kopiera `.env.example` till `.env` i projektets rot.
   - Klistra in din Payment Link för t-shirt i `VITE_STRIPE_LINK_TSHIRT`.
   - Klistra in din Payment Link för tote bag i `VITE_STRIPE_LINK_TOTEBAG`.

5. **Bygg och deploya** – vid build läses `.env` in och länkarna används på "Köp"-knapparna.

Utan `.env` eller tomma variabler visas "Kommer snart" istället för "Köp".

## Egna bilder

Bytt ut `image`-URL:erna i `src/data/merch.ts` till egna bilder (t.ex. från `src/assets/images/merch/`) när du har dem.

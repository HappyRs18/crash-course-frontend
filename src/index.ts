const basePath = `http://localhost:3000`;
const url = `inflationsrechner`;

const heutigerWertElement = document.getElementById("heutiger-wert");
const heutigerWertNachInflationElement = document.getElementById(
  "heutiger-wert-nach-inflation"
);
const benoetigterWertNachInflationElement = document.getElementById(
  "benoetigter-wert-nach-inflation"
);
const benoetigterWertFuerAusgleichElement = document.getElementById(
  "benoetigter-wert-fuer-ausgleich"
);

async function getInflationsrechnerErgebnisse(): Promise<any> {
  const response = await fetch(`${basePath}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inflationsRate: 2.5,
      heutigerWert: 1000,
      jahre: 30,
    }),
  });

  return response.json();
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(num);
}

interface InflationsrechnerErgebnisse {
  wertHeute: number;
  wertNachInflation: number;
  wertBenoetigtNachInflation: number;
  wertBenoetigtFuerAusgleich: number;
}

getInflationsrechnerErgebnisse().then((result: InflationsrechnerErgebnisse) => {
  if (result != null) {
    if (heutigerWertElement != null) {
      heutigerWertElement.innerHTML = formatNumber(result.wertHeute);
    }

    if (heutigerWertNachInflationElement != null) {
      heutigerWertNachInflationElement.innerHTML = formatNumber(
        result.wertNachInflation
      );
    }

    if (benoetigterWertNachInflationElement != null) {
      benoetigterWertNachInflationElement.innerHTML = formatNumber(
        result.wertBenoetigtNachInflation
      );
    }

    if (benoetigterWertFuerAusgleichElement != null) {
      benoetigterWertFuerAusgleichElement.classList.remove(
        "inflationsergebnis__result--blue"
      );
      if (result.wertBenoetigtFuerAusgleich < 50) {
        benoetigterWertFuerAusgleichElement.classList.add(
          "inflationsergebnis__result--blue"
        );
      }

      benoetigterWertFuerAusgleichElement.innerHTML = formatNumber(
        result.wertBenoetigtFuerAusgleich
      );
    }
  }
});

// Static Typing vs. Dynamic Typing

let count1 = "90";
let count2: string = "70";
let count3 = 70;

class IListElement {
  public id: string;
  public order: number;
}

class Biological {
  public lifeSpan: number;
  public maxAge: number;
}

class Animal extends Biological implements IListElement {
  public name: string;
  public id: string;    // From IListElement
  public order: number; // From IListElement

  constructor(name: string) {
    super();
    this.name = name;
  }
}

class Undead {
  public age: number;
}

class Mushroom extends Undead {}

class Human {}

function createAnimal(): Animal {
  return new Animal("Test");
}

const anonymousObject: Animal = createAnimal();

// Types / Intersection Types / Union Types

enum Anrede {
  Herr = 0,
  Frau = 1,
}

type mixed = string | boolean;

abstract class ICalculatorBase<Eingaben, Ergebnisse> {
  eingaben: Eingaben;
  ergebnisse: Ergebnisse;

  constructor(eingaben: Eingaben, ergebnisse: Ergebnisse) {
    this.eingaben = eingaben;
    this.ergebnisse = ergebnisse;
  }

  abstract calculate(): void;

  debug() {
    console.log("DEBUG: ", this.eingaben, this.ergebnisse);
  }
}

class Inflationsrechner extends ICalculatorBase<
  InflationsrechnerEingabe,
  InflationsrechnerErgebnis
> {
  private _inflationsrate: number;

  public get inflationsrate() {
    return this._inflationsrate;
  }

  calculate(): void {
    throw new Error("Method not implemented.");
  }
  constructor(
    eingaben: InflationsrechnerEingabe,
    ergebnisse: InflationsrechnerErgebnis
  ) {
    super(eingaben, ergebnisse);
  }

  static asJson() {
    console.log("JSON Output");
  }
}

interface InflationsrechnerEingabe {
  UnterjaehrigRechnen: boolean;
  Notizen: string;
  KaufkraftverlustInflationsrate: number;
  KaufkraftverlustJahre: number;
  KaufkraftverlustZusaetzlicheJahre: number;
  KaufkrafterhaltGewuenschteKaufkraft: number;
  KaufkrafterhaltInflationsrate: number;
  KaufkrafterhaltJahre: number;
  KaufkraftverlustStartkapital: number;
}

export interface InflationsrechnerErgebnis {
  Jahre: any[];
  LetztesJahr: number;
  Kaufkraftverlust1: number;
  Kaufkraftverlust2: number;
  Kaufkraftverlust1Prozent: number;
  Kaufkraftverlust2Prozent: number;
  KaufkraftverlustGesamtdauer: number;
  ErforderlicheKaufkraft1: number;
  ErforderlicheKaufkraft2: number;
  ErforderlicheKaufkraftGesamtdauer: number;
  BeschriftungKaufkraftverlust1: string;
  BeschriftungKaufkraftverlust2: string;
  BeschriftungErforderlicheKaufkraft1: string;
  BeschriftungErforderlicheKaufkraft2: string;
  ZeigeZusaetzlicheJahre: boolean;
  Beschriftung45: string;
  Beschriftung30: string;
  Beschriftung25: string;
  Beschriftung20: string;
  Beschriftung15: string;
  Wert45: number;
  Wert30: number;
  Wert25: number;
  Wert20: number;
  Wert15: number;
  WichtigerHinweis: string;
  InflationSampleList: any[];
  InflationSampleBeschreibung: string;
  InflationSampleQuelle: string;
}

let mixedVar: Inflationsrechner = new Inflationsrechner(null, null);

mixedVar.debug();
mixedVar.calculate();

const currentInflationsrate = mixedVar.inflationsrate;

Inflationsrechner.asJson();

console.log(mixedVar.ergebnisse.BeschriftungErforderlicheKaufkraft1);

function firstOrDefault<T extends Animal>(args: T[]): T {
  if (args == null) return null;

  return args[0] ?? null;
}

const listMushrooms = [new Mushroom(), new Mushroom()];

// const mushroom = firstOrDefault(listMushrooms)

abstract class Control {
  public label: string;
  public id: string;
  abstract callback: Function;

  constructor(id, label: string) {}
}

class TextBox extends Control {
  callback: Function;

  constructor() {
    super("6CA3D5C9-D7CA-4E89-8E60-7EF96B00CD30", "Ich bin eine Textbox");
  }
}

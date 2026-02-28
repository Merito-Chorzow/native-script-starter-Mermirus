import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import * as camera from "@nativescript/camera";
import { ImageSource } from "@nativescript/core";

@Injectable({ providedIn: "root" })
export class InventoryService {
  items: any[] = [];
  constructor(private http: HttpClient) {}
  fetchItems() {
    return this.http.get("https://jsonplaceholder.typicode.com/posts?_limit=5");
  }
  addItem(item: any) {
    return this.http.post("https://jsonplaceholder.typicode.com/posts", item);
  }
}

// === WIDOK 1: LISTA PRODUKTÓW ===
@Component({
  selector: "ns-list",
  template: `
    <ActionBar title="Magazyn (Lista)"></ActionBar>
    <StackLayout>
      <Button
        text="+ Skanuj / Dodaj Produkt"
        class="-primary"
        (tap)="onAdd()"
        margin="10"
      ></Button>
      <ListView [items]="items" (itemTap)="onItemTap($event)" height="100%">
        <ng-template let-item="item">
          <StackLayout padding="10">
            <Label [text]="item.title" fontWeight="bold" fontSize="18"></Label>
            <Label [text]="'Kod kreskowy: ' + item.id" color="gray"></Label>
          </StackLayout>
        </ng-template>
      </ListView>
    </StackLayout>
  `,
})
export class ListComponent {
  items: any[] = [];
  constructor(
    public api: InventoryService,
    private router: Router,
  ) {
    this.api.fetchItems().subscribe((res: any) => {
      this.items = res;
      this.api.items = res;
    });
  }
  onAdd() {
    this.router.navigate(["/add"]);
  }
  onItemTap(args: any) {
    this.router.navigate(["/detail", this.items[args.index].id]);
  }
}

// === WIDOK 2: SZCZEGÓŁY ===
@Component({
  selector: "ns-detail",
  template: `
    <ActionBar title="Szczegóły Produktu">
      <NavigationButton
        text="Wróć"
        android.systemIcon="ic_menu_back"
      ></NavigationButton>
    </ActionBar>
    <StackLayout padding="20">
      <Label [text]="item?.title" fontSize="22" fontWeight="bold"></Label>
      <Label
        [text]="'Opis: ' + item?.body"
        textWrap="true"
        marginTop="10"
      ></Label>
      <Label [text]="'Zdjęcie ze skanera:'" marginTop="20"></Label>
      <Image
        *ngIf="item?.photo"
        [src]="item?.photo"
        height="200"
        marginTop="10"
      ></Image>
      <Label *ngIf="!item?.photo" text="Brak zdjęcia" color="red"></Label>
      <Button
        text="Usuń Produkt"
        class="-outline -danger"
        (tap)="onDelete()"
        marginTop="30"
      ></Button>
    </StackLayout>
  `,
})
export class DetailComponent {
  item: any;
  constructor(
    private route: ActivatedRoute,
    private api: InventoryService,
    private router: Router,
  ) {
    const id = +this.route.snapshot.params.id;
    this.item = this.api.items.find((i) => i.id === id) || {
      title: "Mock",
      body: "Brak w lokalnej bazie",
    };
  }
  onDelete() {
    alert("Zlecono usunięcie z bazy");
    this.router.navigate(["/list"]);
  }
}

// === WIDOK 3: DODAWANIE (Formularz + Aparat) ===
@Component({
  selector: "ns-add",
  template: `
    <ActionBar title="Zeskanuj Produkt">
      <NavigationButton
        text="Wróć"
        android.systemIcon="ic_menu_back"
      ></NavigationButton>
    </ActionBar>
    <StackLayout padding="20">
      <TextField
        hint="Nazwa produktu (Wymagane!)"
        [(ngModel)]="title"
      ></TextField>
      <TextField hint="Opis lub kod" [(ngModel)]="body"></TextField>
      <Button
        text="Uruchom Skaner (Aparat)"
        class="-primary"
        (tap)="onScan()"
        marginTop="10"
      ></Button>
      <Image *ngIf="photo" [src]="photo" height="150" marginTop="10"></Image>
      <Button
        text="Zapisz do chmury (API)"
        class="-primary"
        (tap)="onSave()"
        marginTop="20"
      ></Button>
      <Label
        [text]="msg"
        color="red"
        marginTop="10"
        textAlignment="center"
      ></Label>
    </StackLayout>
  `,
})
export class AddComponent {
  title = "";
  body = "";
  photo: any;
  msg = "";
  constructor(
    private api: InventoryService,
    private router: Router,
  ) {}
  onScan() {
    camera
      .requestPermissions()
      .then(() => {
        camera
          .takePicture({ width: 300, height: 300, keepAspectRatio: true })
          .then((img) => {
            ImageSource.fromAsset(img).then((res) => (this.photo = res));
          });
      })
      .catch(() => (this.msg = "Brak uprawnień do aparatu!"));
  }
  onSave() {
    if (!this.title.trim()) {
      this.msg = "BŁĄD WALIDACJI: Wpisz nazwę!";
      return;
    }
    this.msg = "Zapisywanie...";
    this.api
      .addItem({ title: this.title, body: this.body, photo: this.photo })
      .subscribe(
        () => {
          this.router.navigate(["/list"]);
        },
        () => (this.msg = "Błąd połączenia z API"),
      );
  }
}

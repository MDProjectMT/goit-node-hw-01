const fs = require("node:fs").promises;
const { nanoid } = require("nanoid");
const path = require("node:path");

const contactsPath = "./db/contacts.json";

function listContacts() {
  // ODNAJDYWANIE PLIKU WEDŁUG ŚCIEŻKI
  const file = fs.readFile(path.resolve(contactsPath));
  // ODCZYTYWANIE PLIKU
  file.then((content) => {
    // KONWERTOWANIE ZAWARTOŚCI PLIKU NA CIĄG ZNAKÓW
    const fileString = content.toString();
    // KONWERTOWANIE CIĄGU ZNAKÓW NA JSON ORAZ UMIESZCZENIE WYNIKU W TABELI (console.table)
    console.table(JSON.parse(fileString));
  });
}

function getContactById(contactId) {
  // ODNAJDYWANIE PLIKU WEDŁUG ŚCIEŻKI
  const file = fs.readFile(path.resolve(contactsPath));
  // ODCZYTYWANIE PLIKU
  file.then((content) => {
    // KONWERTOWANIE ZAWARTOŚCI PLIKU NA CIĄG ZNAKÓW
    const fileString = content.toString();
    // PRZEKONWERTOWANIE WYNIKU Z CIĄGU ZNAKÓW NA JSON
    const result = JSON.parse(fileString);
    // FILTROWANIE JSON W POSZUKIWANIU KONTAKTU O KONKRETNYM ID
    console.log(result.find((contact) => contact.id === contactId));
  });
}

function removeContact(contactId) {
  // ODNAJDYWANIE PLIKU WEDŁUG ŚCIEŻKI
  const file = fs.readFile(path.resolve(contactsPath));
  // ODCZYTYWANIE PLIKU
  file.then((content) => {
    // KONWERTOWANIE ZAWARTOŚCI PLIKU NA CIĄG ZNAKÓW
    const fileString = content.toString();
    // PRZEKONWERTOWANIE WYNIKU Z CIĄGU ZNAKÓW NA JSON
    const result = JSON.parse(fileString);
    // FILTROWANIE JSON W POSZUKIWANIU KONTAKTU O ŻĄDANYM ID
    const afterDelete = result.filter((contact) => contact.id !== contactId);
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(afterDelete)).then(
      () => {
        console.log("File save completed successfully".green);
      }
    );
  });
}

function addContact(name, email, phone) {
  // ODNAJDYWANIE PLIKU WEDŁUG ŚCIEŻKI
  const file = fs.readFile(path.resolve(contactsPath));
  // ODCZYTYWANIE PLIKU
  file.then((content) => {
    // KONWERTOWANIE ZAWARTOŚCI PLIKU NA CIĄG ZNAKÓW
    const fileString = content.toString();
    // PRZEKONWERTOWANIE WYNIKU Z CIĄGU ZNAKÓW NA JSON
    const result = JSON.parse(fileString);
    // DODAWANIE ELEMENTÓW DO TABLICY Z KONTAKTAMI
    result.push({
      id: nanoid(21),
      name,
      email,
      phone,
    });
    // ZAPIS NOWYCH DANYCH KONTAKTOWYCH DO PLIKU
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(result)).then(
      () => {
        console.log("File save completed successfully".green);
      }
    );
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

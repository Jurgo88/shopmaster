<template>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ID nákupu</th>
          <th>Název</th>
          <th>Kategorie</th>
          <th>Cena</th>
          <th>Datum</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="polozka in polozky" :key="polozka.id">
          <td>{{ polozka.idPolozky }}</td>
          <td>{{ polozka.idNakupu }}</td>
          <td>{{ polozka.nazov }}</td>
          <td>{{ polozka.kategoria }}</td>
          <td>{{ polozka.cena }}</td>
          <td>{{ polozka.datum }}</td>
          <td>
            <button @click="editPolozka(polozka)">Upravit</button>
            <button @click="deletePolozka(polozka.id)">Smazat</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: ['polozky'],
    methods: {
      editPolozka(polozka) {
        this.$emit('editPolozka', polozka);
      },
      deletePolozka(id) {
        this.$emit('deletePolozka', id);
      }
    }
  };
  </script>
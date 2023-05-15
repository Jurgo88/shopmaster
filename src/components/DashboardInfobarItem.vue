<template>
    <div class="box">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .box {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    border: 1px solid gray;
  }
  </style>
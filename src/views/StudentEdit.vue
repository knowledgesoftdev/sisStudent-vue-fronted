<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          EDIT STUDENT
        </div>
        <div class="card-body">
          <form v-on:submit="editStudent">
            <div class="d-grid col-6 mx-auto mb-3">
              <img
                id="imgFoto"
                class="img-thumbnail"
                v-if="this.image"
                height="100"
                :src="this.image"
              />
              <img
                id="imgFoto"
                class="img-thumbnail"
                v-else
                height="100"
                src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-6/32/no-image-512.png"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input
                v-model="first_name"
                id="first_name"
                placeholder="Ingrese su nombre"
                maxlength="50"
                type="text"
                class="form-control"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input
                v-model="last_name"
                id="last_name"
                placeholder="Ingrese su apellido"
                maxlength="50"
                type="text"
                class="form-control"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-gift"></i>
              </span>
              <input
                v-on:change="previewImage"
                type="file"
                accept="image/png, image/jpeg,image/jpg,image/gif"
              />
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <button class="btn btn-warning">
                <i class="fa-solid fa-refresh"></i> UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { showAlert, sendSolicitud } from "../functions";

export default {
  data() {
    return {
      id: 0,
      first_name: "",
      last_name: "",
      image: "",
      url: "http://127.0.0.1:8000/api/students",
      cargando: false,
    };
  },
  mounted() {
    const route=useRoute()
    this.id=route.params.id
    this.url+='/'+this.id
    this.getStudents()
  },
  methods: {
    getStudents(){
      axios.get(this.url).then((response) => {
        this.first_name=response.data.data.first_name
        this.last_name=response.data.data.last_name
        this.image=response.data.data.image
      })
    },
    editStudent() {
      event.preventDefault();
      let miFoto = document.getElementById("imgFoto");
      this.image = miFoto.src;
      if (this.first_name.trim() === "") {
        showAlert("Ingrese sus nombres", "warning", "name");
      } else if (this.last_name.trim() === "") {
        showAlert("Ingrese sus apellidos", "warning", "lastName");
      } else {
        const parametros = {
          first_name: this.first_name.trim(),
          last_name: this.last_name.trim(),
          image: this.image.trim(),
        };

        sendSolicitud("PUT", parametros, this.url, "Student Actulizado");
      }

      this.cargando = true;
    },
    previewImage(event) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        let miFoto = document.getElementById("imgFoto");
        miFoto.src = reader.result;
        this.image = miFoto.src;
      };
    },
  },
};
</script>
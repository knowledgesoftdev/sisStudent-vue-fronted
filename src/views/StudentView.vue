<template>
  <div class="showStudent">
    <h1>Show All Student</h1>

    <div class="row">
      <div class="col-lg-8 offset-2">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="text-center">
              <tr>
                <th>#</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>IMAGE</th>
                <th>FECHA REGISTRO</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="this.charging" class="text-center">
                <th colspan="6">LOADING STUDENTS</th>
              </tr>
              <tr v-if="students.length===0" class="text-center">
                <th colspan="6">NO HAY REGISTROS</th>
              </tr>
              <tr v-else v-for="(student, i) in students" :key="student.id">
                <td v-text="i + 1"></td>
                <td v-text="student.first_name.toUpperCase()"></td>
                <td v-text="student.last_name.toUpperCase()"></td>
                <td class="d-flex align-items-center justify-content-center">
                  <img
                    class="img-thumbnail"
                    v-if="student.image"
                    style="width: 75px !important"
                    :src="student.image"
                  />
                  <img
                    class="img-thumbnail"
                    v-else
                    style="width: 75px !important"
                    src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-6/32/no-image-512.png"
                    alt=""
                  />
                </td>
                <td
                  v-text="
                    new Date(student.created_at).toLocaleDateString('en-US')
                  "
                ></td>
                <td class="d-flex justify-content-between">
                  <router-link
                    :to="{ path: 'view/' + student.id }"
                    class="btn btn-info btn-sm"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </router-link>
                  <router-link
                    :to="{ path: 'editStudent/' + student.id }"
                    class="btn btn-warning btn-sm"
                  >
                    <i class="fa-solid fa-edit"></i>
                  </router-link>
                  <button
                    v-on:click="
                      deleteStudent(student.id, student.first_name)
                    "
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { deleteConfirmation } from "../functions.js";

export default {
  data() {
    return {
      students: [],
      charging: false,
    };
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.charging = true;
      const url = "http://127.0.0.1:8000/api/students";
      axios.get(url).then((response) => {
        this.students = response.data;
        this.charging = false;
      });
    },
    deleteStudent(id, nameStudent) {
      const url = "http://127.0.0.1:8000/api/students/";
      deleteConfirmation(
        url,
        id,
        "Deleted student",
        "Realmente desea eliminar a " + nameStudent + "?"
      );
      this.charging = false;
    },
  },
};
</script>
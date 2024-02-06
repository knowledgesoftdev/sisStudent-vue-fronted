import Swal from "sweetalert2";
import axios from "axios";

//mostrar alert
export function showAlert(title, icono, focus = "") {
  if (focus != "") {
    document.getElementById(focus).focus();
  }

  Swal.fire({
    title: title,
    icon: icono,
    customClass: { confirmButton: "btn btn-primary", popup: "animated zoonIn" },
    buttonsStyling: false,
  });
}

//confirmar eliminacion
export function deleteConfirmation(urlConSlash, id, title, mensaje) {
  const url = urlConSlash + id;
  const showAlertSwal = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger",
    },
  });

  showAlertSwal
    .fire({
      title: title,
      text: mensaje,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "<i class='fa-solid fa-check'></i> Si, Eliminar",
      cancelButtonText: "<i class='fa-solid fa-cancel'></i> Cancelar",
    })
    .then((response) => {
      if (response.isConfirmed) {
        sendSolicitud("DELETE", { id: id }, url, "Student Deleted");
      } else {
        showAlert("Operacion cancelada", "info");
      }
    });
}

export function sendSolicitud(metodo, parametros, url, mensaje) {
  axios({
    method: metodo,
    url: url,
    data: parametros,
  })
    .then((res) => {
      let status = res.status;
      if (status == 200) {
        showAlert(mensaje, "success");
        window.setTimeout(() => {
          window.location.href = "/showStudent";
        }, 1000);
      } else {
        showAlert("No se pudo recuperar la respuesta", "error");
      }
    })
    .catch((error) => {
      showAlert("Error " + error, "error");
    });
}

<template>
  <nav class="navbar navbar-expand-lg bg-primary"  data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="#">GESTION ACADEMICA</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Student
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/showStudent"
                  >List Student</router-link
                >
                <router-link class="dropdown-item" to="/addStudent"
                  >Add Student</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>



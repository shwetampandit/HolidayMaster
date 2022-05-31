<!-- <template>
  <div>
    <form @submit.prevent="register" method="post">
      <div>
        <label>Name:</label>
        <input type="text" v-model="user.name" />
        <div>{{ errors.name }}</div>
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" v-model="user.phone" />
        <div>{{ errors.phone }}</div>
      </div>
      <div>
        <label>Email:</label>
        <input type="text" v-model="user.email" />
        <div>{{ errors.email }}</div>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="user.password" />
        <div>{{ errors.password }}</div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        phone: "",
      },
      valid: true,
      success: false,
      errors: {},
      message: null,
    };
  },
  register() {
    this.errors = {};

    const validName = validateName(this.user.name);
    this.errors.name = validName.error;
    if (this.valid) {
      this.valid = validName.valid;
    }

    const validPhone = validatePhone(this.user.phone);
    this.errors.phone = validPhone.error;
    if (this.valid) {
      this.valid = validPhone.valid;
    }

    const validEmail = validateEmail(this.user.email);
    this.errors.email = validEmail.error;
    if (this.valid) {
      this.valid = validEmail.valid;
    }

    const validPassword = validatePassword(this.user.password);
    this.errors.password = validPassword.error;
    if (this.valid) {
      this.valid = validPassword.valid;
    }

    if (this.valid) {
      alert("HURRAAYYY!! :-)\n\n" + JSON.stringify(this.user));
    }
  },
};
</script>
<style>
</style> -->
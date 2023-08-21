<script setup lang="ts">
import { useAuth } from "devise-token-auth-vue";

const auth = useAuth();

console.log("auth: ", auth);

const registerEmail = () => {
  auth?.registerEmail({
    email: "test@example.com",
    password: "111111",
    password_confirmation: "111111",
  });
};

const deleteAccount = () => {
  auth?.deleteAccount();
};
</script>

<template>
  <div>
    <h1>Demo</h1>

    <div class="space-y-3">
      <button @click="registerEmail">register email</button>
      <button @click="deleteAccount">delete account</button>
    </div>
  </div>
</template>

<style lang="css">
button {
  display: block;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style>

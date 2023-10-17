<script setup lang="ts">
import { useAuth } from "devise-token-auth-vue";

const auth = useAuth();

console.log("auth: ", auth);

const registerEmail = () => {
  auth?.signIn({
    email: "hi@example.com",
    password: "111111",
  });
};

const validate = async () => {
  const resp = await auth?.validateToken([2], "test");

  console.log("validate resp: ", resp);
};
</script>

<template>
  <div>
    <h1>Demo</h1>

    <div class="space-y-3">
      <button @click="registerEmail">register email</button>
      <button @click="validate">validate token</button>
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

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold text-gray-900">Edit Child</h1>
    <p class="mt-2 text-gray-600">Child ID: {{ $route.params.id }}</p>
    <div class="mt-4">
      <router-link to="/children" class="text-blue-600 hover:text-blue-800">← Back to Children</router-link>
    </div>
  </div>
</template>

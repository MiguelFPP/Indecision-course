<template>
    <h2>{{ customTitle }}</h2>
    <p>{{ counter }}</p>
    <p data-testid="counter">{{ counter }}</p>

    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>

    <p v-if="message">{{ message }}</p>

    <h2>Square value</h2>

    <p>{{ this.start }} <sup>2</sup> = {{ getSquaredCounted }} </p>
</template>

<script>
export default {
    name: 'Counter',
    props: {
        title: { type: String, required: true },
        start: {
            type: Number, default: 100,
            validator(value) {
                return value >= 100;
            }
        },
    },
    data() {
        return {
            counter: this.start,
            message: null
        }
    },
    methods: {
        increment() {
            this.counter++;

            if (this.message) {
                this.message = null;
            }
        },
        decrement() {
            if (this.counter > 0) {
                this.counter--;
            } else {
                this.message = "Counter can't be less than 0";
            }
        },
        getSquaredValue() {
            return this.counter * this.counter;
        },
    },
    computed: { //se lanza una vez que se ha cambiado el valor de counter
        getSquaredCounted() {
            console.log('getSquaredCounted');
            return this.counter * this.counter;
        },
        customTitle() {
            return this.title ? this.title : 'Counter';
        }
    },

}
</script>

<style>
button {
    background-color: #4CAF50;
    border-radius: 5px;
    border: none;
    color: white;
    margin: 0 5px;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
}

button:hover {
    background-color: #3e8e41;
}
</style>
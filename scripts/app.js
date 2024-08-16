const app = Vue.createApp({
    data(){
        return{
            studentName : 'Harsh Thakor',
            studentId : 1091962,
            randomFact : '',
            city : '',
            word : '',
            weather : {
                city :'',
                temperature : '',
                wind : '',
                description : ''
            },
            dictionary : {
                word : '',
                phonetic : '',
                partofSpeech : '',
                definition :''
            }
        };
    },

    // computed properties
    computed:{
        nameId(){
            return this.studentName + '-' + this.studentId; 
        }
    },

    //fetching api data in each method and store in a variable and use for further reference
    methods:{
        randomFactData(){
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
            .then(response =>{
                if(response.ok){
                    return response.json();
                }
            })
            .then(data => {
                this.randomFact = data.text;
            })
            .catch(error =>{
                console.error('Error:', error);
                this.randomFact = 'N/A';
            })
        },
        weatherData() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                this.weather.temperature = data.temperature;
                this.weather.wind = data.wind;
                this.weather.description = data.description;
            })
            .catch(error => {
                console.error('Error:', error);
                this.weather.temperature = 'N/A';
                this.weather.wind = 'N/A';
                this.weather.description = 'N/A';
            });
        },
        dictionaryData(){
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
            .then(response =>{
                if(response.ok){
                    return response.json();
                }
            })
            .then(data => {
                this.dictionary.word = data[0].word;
                this.dictionary.phonetic = data[0].phonetic;
                this.dictionary.partOfSpeech = data[0].meanings[0].partOfSpeech;
                this.dictionary.definition = data[0].meanings[0].definitions[0].definition;

            })
            .catch(error =>{
                console.error('Error:', error);
                this.dictionary.word = 'N/A';
                this.dictionary.phonetic = 'N/A';
                this.dictionary.partofSpeech = 'N/A';
                this.dictionary.definition = 'N/A';

            })
        }

    },
    //mounting each function    
    mounted(){
        this.randomFactData();
        this.weatherData();
        this.dictionaryData();
    }
});
//mounting app 
app.mount('#app');
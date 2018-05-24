<script>
export default {
        props:{
            'data' : { 
                type : Object,
                default: function () {
                return {}
                }
            }
        },
        data(){
            return {
                errors : this.getErrors(),
                isvalid : false
            }
        },
        created(){
            this.$on('error',this.error);
        },
        methods:{
            getErrors(){
                var obj = {};
                for(let input in this.data){
                   obj[input] = []; 
                }
                return obj;
            },

            error(key,array){
                this.errors[key] = array;
                this.isValid();
            },

            submit(){
                alert('Enviando el formulario');
            },

            isValid(){
                var val = true;
                for(var input in this.errors){
                    if(this.errors[input].length > 0){val = false;}
                }
               this.isvalid = val;
               return val;
            }
        }
}
</script>
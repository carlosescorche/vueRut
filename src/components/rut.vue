<template>
    <div class="form-group">
        <label for="usuario-rut">Rut</label>
        <input type="text" v-model="data" @keyup="validar()" @keypress="press($event)" @blur="blur" class="form-control" :class="{'is-invalid' : errors.length > 0 }" id="usuario-rut" placeholder="Ingresa tu Rut">
        <div v-if="errors.length > 0" class="invalid-feedback">
            {{errors[0]}}
        </div>  
    </div>
</template>
<script>
export default {
    props:{
        model:{
            type: String,
            default(){
                return 'rut';
            }
        }
    },
    data(){
        return{
            data : '',
            errors: []
        }
    },
    methods:{

        validar(){
            let error = [];
            // Eliminar . (puntos) en caso que el valor lo tenga
            let input = this.data.replace(/\./g, "");
            
            // Eliminar - (guión) en caso que el valor lo tenga
            input = input.replace(/-/g, "");

            // Separar el cuerpo del verificador - cortamos el string del 1ro al penúltimo carácter
            let cuerpo = input.slice(0,-1);
            
            let verificador = input.slice(-1).toUpperCase();

            // Si no cumple con la longitud minima
            if(cuerpo.length < 7) {
                error.push("El RUT está incompleto");
            }

            // Calcular Dígito Verificador
            let contador = 0;
            let multiplo = 2;

            for(let i=1;i<=cuerpo.length;i++) {

                // multiplicando valores por serie numerica
                let index = multiplo * input.charAt(cuerpo.length - i);
                
                // incrementando contador
                contador = contador + index;

                // modificar multiplo dentro del rango [2,7]
                if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
            }

            // Aplicando Módulo 11
            let resultado = 11 - (contador % 11);

            // traducimos el verificador en casos especiales K y 0  
            verificador = (verificador == 'K')?10:verificador;
            verificador = (verificador == 0)?11:verificador;

            // Validar que el cuerpo coincide con su Dígito Verificador
            if(resultado != verificador) {
                error.push("El RUT es inválido");
            }
            
            this.errors = error;
            this.$parent.$emit('error',this.model,this.errors);
        },
        press(event){
            if(!(/^[\d\.\-kK]$/.test(event.key))){
                event.preventDefault();
            }
        },
        blur(){
            let input = this.data.replace(/^0+/, "");

            if (input != '' && input.length > 1) {
               
                input = input.replace(/\./g, "");
                input = input.replace(/-/g, "");
                
                let cuerpo = input.substring(0, input.length - 1);
                var rut = "";
                let i = 0;
                let j = 1;
                
                for (i = cuerpo.length - 1; i >= 0; i--) {
                    let letra = cuerpo.charAt(i);
                    rut = letra + rut;
                    if (j % 3 == 0 && j <= cuerpo.length - 1) {
                        rut = "." + rut;
                    }
                    j++;
                }
                
                let v = input.substring(input.length - 1);
                rut = rut + "-" + v;
            }
            this.data = rut;

        }
        
    },
}
</script>

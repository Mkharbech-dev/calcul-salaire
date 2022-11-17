$(document).ready(function(){

   $('input').keyup( function () {
    console.log($(this).attr('id')) 
    calcul( $(this).attr('id') )
});
    // });
    // $('input').keyup(
    //fonction de calcul de salaire
    function calcul(depart) {
        // console.log(depart);
        
        // le point de départ va être utile pour la suite du calcul. 
        //Partons du principe que 30 000 € a été saisie en annuelBrut.


        //recupére tous les champs

        // recuperation via id.
        var postMois = document.querySelector("#mois");
        // remplacement des eventuelles virgules par des points.
        var postMois = postMois.value.replace(",",".");
        
        console.log("postMois");
        console.log(postMois);
        // recuperation via id.
        var postCharges = document.querySelector("#charges"); 
        console.log("postCharges");
        
        // remplacement des eventuelles virgules par des points.
        var postCharges = postCharges.value.replace(",","."); 
        console.log(postCharges);
        
        // recuperation via id.
        var postHeures = document.querySelector("#heures"); 
        // remplacement des eventuelles virgules par des points.
        var postHeures = postHeures.value.replace(",",".");
        console.log("postHeures");
        console.log(postHeures);
        
        // recuperation du salaire via id. celui qui a lancé le départ.
        var postSalaire = document.getElementById(depart); 
        
        // remplacement des eventuelles virgules par des points.
        var postSalaire = postSalaire.value.replace(",","."); 
        
        console.log("postSalaire");
        console.log(postSalaire);

        // regex pour retirer les caractères qui ne sont pas des chiffres. 
        //exemple '€, %, etc.'
        postSalaire = postSalaire.replace(/[^\d.]/g, '');  

        // 100 - 23 / 100 = 0.77 -- cette ligne me permet de savoir que sur 23% de charge, je garderai donc 77% du salaire.
        var charges = (100 - postCharges)/100;

        // nombre d'heure divisé par 5 jours.
        var heures = postHeures / 5;

        // // le nombre de mois travaillé, au minimum 1.
        // if(postMois <= 0) postMois = 1;

        // // le nombre d'heures travaillé, au minimum 1.
        // if(heures <= 0) heures = 1;


        //---------------------- Début du tableau contenant tous les calculs --------------------------
	//  => pour une premiere version : nous pouvons inscrire 12 au lieu de postMois, 35 au lieu de heures, 0.77 au lieu de charges.
	var tabCalcul = {
        //https://www.compta-online.com/distinguer-les-jours-ouvrables-des-jours-ouvres-ao2982
        //Jours ouvrés = 5 j * 52 semaines / 12 mois = 21.67 j 
		'annuelBrut' : { 
            'mensuelBrut' : '/'+postMois,
            'journalierBrut' : '/'+postMois+'/21.6718', 
            'horairesBrut' : '/'+postMois+'/21.6718/'+heures, 
            'annuelNet' : '*'+charges, 
            'mensuelNet' : '*'+charges+'/'+postMois, 
            'journalierNet' : '*'+charges+'/'+postMois+'/21.6718',
            'horairesNet' : '*'+charges+'/'+postMois+'/21.6718/'+heures 
        },

		'mensuelBrut' : { 'annuelBrut' : '*'+postMois,  'journalierBrut' : '/21.6718', 'horairesBrut' : '/21.6718/'+heures, 'annuelNet' : '*'+charges+'*'+postMois,  'mensuelNet' : '*'+charges,  'journalierNet' : '*'+charges+'/21.6718', 'horairesNet' : '*'+charges+'/21.6718/'+heures  },

		'journalierBrut' : { 'annuelBrut' : '*21.6718*'+postMois, 'mensuelBrut' : '*21.6718', 'horairesBrut' : '/'+heures, 'annuelNet' : '*21.6718*'+postMois+'*'+charges, 'mensuelNet' : '*21.6718*'+charges, 'journalierNet' : '*'+charges, 'horairesNet' : '/'+heures+'*'+charges  },

		'horairesBrut' : { 'annuelBrut' : '*'+heures+'*21.6718*'+postMois, 'mensuelBrut' : '*'+heures+'*21.6718', 'journalierBrut' : '*'+heures, 'annuelNet' : '*'+charges+'*'+heures+'*21.6718*'+postMois, 'mensuelNet' : '*'+heures+'*21.6718*'+charges, 'journalierNet' : '*'+heures+'*'+charges, 'horairesNet' : '*'+charges  },


		'annuelNet' : { 'annuelBrut' : '*1.2987011', 'mensuelBrut' : '*1.2987011/'+postMois, 'journalierBrut' : '*1.2987011/'+postMois+'/21.6718', 'horairesBrut' : '*1.2987011/'+postMois+'/21.6718/'+heures,  'mensuelNet' : '/'+postMois, 'journalierNet' : '/'+postMois+'/21.6718', 'horairesNet' : '/'+postMois+'/21.6718/'+heures  },


		'mensuelNet' : { 'annuelBrut' : '*'+postMois+'*1.2987011', 'mensuelBrut' : '*1.2987011', 'journalierBrut' : '/21.6718*1.2987011', 'horairesBrut' : '*1.2987011/21.6718/'+heures,  'annuelNet' : '*'+postMois, 'journalierNet' : '/21.6718', 'horairesNet' : '/21.6718/'+heures  },

		'journalierNet' : { 'annuelBrut' : '*21.6718*'+postMois+'*1.2987011', 'mensuelBrut' : '*21.6718*1.2987011', 'horairesBrut' : '/'+heures+'*1.2987011', 'annuelNet' : '*21.6718*'+postMois, 'mensuelNet' : '*21.6718', 'horairesNet' : '/'+heures  },

		'horairesNet' : { 'annuelBrut' : '*'+heures+'*21.6718*'+postMois+'*1.2987011', 'mensuelBrut' : '*'+heures+'*21.6718*1.2987011', 'journalierBrut' : '*'+heures+'*1.2987011', 'horairesBrut' : '*1.2987011', 'annuelNet' : '*'+heures+'*21.6718*'+postMois, 'mensuelNet' : '*'+heures+'*21.6718', 'journalierNet' : '*'+heures }
	};
	 console.log("tabCalcul---------------------------------------------");
	 console.log(tabCalcul);
	//---------------------- Fin du tableau contenant tous les calculs --------------------------

        // cette ligne me permet de créer une variable dynamiquement, par exemple resultatannuelBrut.
        window['resultat'+depart] = postSalaire;
    console.log("postSalaire====================================");
    console.log(postSalaire);
    console.log(window['resultat'+depart]);
    console.log("postSalaire====================================");

// je choisi d'aller dans l'un des sous tableaux. si le départ viens de annuelBrut, je consulterai les calculs du sous tableau annuelBrut.
        for(var key in tabCalcul[depart]) 
        {	console.log(key);
            console.log(postSalaire);
            console.log("postSalaire*******************************");
            
            // 30000 / 12 nous donnera le résultat du montant mensuel brut. 30000 / 12 / 21.6718 nous donnera le salaire journalierBrut, etc.
            
            resultat = eval(postSalaire+tabCalcul[depart][key]);
            
            // Math.round() permet d'arrondir.
            resultatFinal = Math.round(resultat * 100) / 100; 
            
            // nous allons chercher chaque id sur les différents input correspondants aux indices du tableau array.
            document.getElementById(key).value = resultatFinal+' €'; 
            
            window['resultat'+key] = resultatFinal; // nous créons des variables dynamique : resultatmensuelBrut, resultatjournalierBrut, etc.
        }

        // si le salaire de départ est différent de 0. nous ajoutons des informations à la page.
        if(postSalaire != 0) 
        {
            var phrase = "<div class=\"totalSalaire\">Vous gagne un salaire net mensuel de <strong>" + formatMillier(resultatmensuelNet) + " €</strong> (ce qui représente un salaire brut mensuel de <strong>" + formatMillier(140) + " €</strong>).<br> Si le taux de charges ";
            if(postCharges == 23) phrase += "est dans la moyenne soit ~ ";
            else  phrase += "est ";
            phrase += "<strong>" + postCharges + " %</strong>, la différence entre le brut et le net sera de <b>" + (resultatmensuelBrut-resultatmensuelNet).toFixed(2) + "</b> € chaque mois.</div><br>";
            document.getElementById("totalSalaire").innerHTML = phrase;
        }

    };

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // cette fonction (facultative) permet de prévoir une regex qui crée un espace sur chaque millier. "1 000" et non pas "1000".
    function formatMillier(nombre) 
    {
    nombre += '';
    var sep = ' ';
    var reg = /(\d+)(\d{3})/;
    while( reg.test( nombre)) {
        nombre = nombre.replace( reg, '$1' +sep +'$2');
    }
    return nombre;
    }

    //https://www.salaire-brut-en-net.fr/smic/#:~:text=1%20121%2C71%E2%82%AC.,17%20163%E2%82%AC.&text=Avec%20une%20majoration%20d'heures%20suppl%C3%A9mentaires%20%C3%A0%2025,%3A%201%20634%2C53%E2%82%AC.
    
    $('#annuel').click(function smic()	// cette fonction permet de retourner le montant du smic dans chaque input adéquat.
    {
        console.log($('#annuelBrut').val());
        document.querySelector('#annuelBrut').value = formatMillier(17496) + ' €';
        document.querySelector('#mensuelBrut').value = formatMillier(1458) + ' €';
        document.querySelector('#journalierBrut').value = formatMillier(67.23) + ' €';
        document.querySelector('#horairesBrut').value = formatMillier(9.61) + ' €';
        document.querySelector('#annuelNet').value = formatMillier(13476) + ' €';
        document.querySelector('#mensuelNet').value = formatMillier(1123) + ' €';
        document.querySelector('#journalierNet').value = formatMillier(51.82) + ' €';
        document.querySelector('#horairesNet').value = formatMillier(7.40) + ' €';
        var postCharges = document.querySelector("#charges");
        var postCharges = postCharges.value.replace(",",".");
        var phrase = "<div class=\"totalSalaire\">Vous gagner un salaire net mensuel de <strong>" + formatMillier(1123) + " €</strong> (ce qui représente un salaire brut mensuel de <strong>" + formatMillier(1458) + " €</strong>).<br> Si le taux de charges ";
        if(postCharges == 23) phrase += "est dans la moyenne soit ~ ";
        else  phrase += "est ";
        phrase += "<strong>" + postCharges + " %</strong>, la différence entre le brut et le net sera de <u>" + (1458-1123).toFixed(2) + "</u> € chaque mois.</div><br>";
        $("#totalSalaire").html(phrase);
    });

    //Les checkbox
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // cette fonction permet de gérer les cases à cocher et d'établir les bons pourcentages de 
    //charge.

    $('input[type=radio]').click(function () {
        console.log($(this).attr('id')) 
        setChecked($(this).attr('id'))
    })
    function setChecked(depart) 
    {
        var cadre = document.getElementById("cadre");
        var fonctionnaire = document.getElementById("fonctionnaire");
        var portage = document.getElementById("portage");
        var independant = document.getElementById("independant");
        var ae = document.getElementById("autoentrepreneur");
        var depart = document.getElementById(depart);
        
        var lesInputs = document.getElementsByClassName('input-calcul2');	
        // console.log(lesInputs[0]);
        for(i = 0; i < lesInputs.length; i++)
        {
            lesInputs[i].checked=false; // on décoche toutes les cases (il ne peut pas y avoir plusieurs cases cochée en même temps pour éviter toute incohérence).
        }
        depart.checked=true; // on recoche la case qui a lancé le départ de la fonction
        if(cadre.checked == 1)
        {
            document.getElementById("charges").value=25.5;
        }
        else if(fonctionnaire.checked == 1)
        {
            document.getElementById("charges").value=15;
        }
        else if(portage.checked == 1)
        {
            document.getElementById("charges").value=50;
        }
        else if(independant.checked == 1)
        {
            document.getElementById("charges").value=45;
        }
        else if(ae.checked == 1)
        {
            document.getElementById("charges").value=25;
        }
        else
        {
            document.getElementById("charges").value=23;
        }
        calcul("annuelBrut"); // on relance le calcul manuellement.
    }
})
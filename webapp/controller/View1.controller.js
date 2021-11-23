sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Button",
	"sap/m/ButtonType"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,
	JSONModel , Button , ButtonType ) {
		"use strict";
		var prev,last;
		return Controller.extend("calculator.controller.View1", {
			onInit: function () {
				
				this.lasts=[];
				// oEvent.getSource().mBindingInfos.value.binding.sPath.slice(1,oEvent.getSource().mBindingInfos.value.binding.sPath.length)
var model=new JSONModel({
	VATPercentage:"",
TotalAmountOfVAT:"",
AmountWithoutVAT:"",
VATAmount:"",
})
this.getView().setModel(model,"model")
			},
			calc:function(oEvent){
			oEvent.getSource().setValue(oEvent.mParameters.value);
			var model=	this.getView().getModel("model");
			var data=model.getData();
			if(oEvent.getSource().getValue()!==""){
				if(prev!== oEvent.getSource().getId().slice(12) ){ //oEvent.getSource().getValue() ) { 
			last = prev;
		}
			prev = oEvent.getSource().getId().slice(12);//oEvent.getSource().getValue() ; 
		}
		else{
				var model=	this.getView().getModel("model");
				var data=model.getData();
					data.VATPercentage = '';
				if(last!=='b'){
					data.AmountWithoutVAT  = '';
				}
					if(last!=='c'){
					data.TotalAmountOfVAT = '';
				}
					if(last!=='d'){
				    data.VATAmount = '';
				}
					model.refresh();
					prev = null;
					last = null;
					return;
		}
		   // if(data.VATPercentage!==""&&data.TotalAmountOfVAT!=="")
		   if((last =="a"&&prev=="b") || (last =="b"&&prev=="a"))
			{
				data.AmountWithoutVAT =parseFloat( data.TotalAmountOfVAT/(1+data.VATPercentage/100)).toFixed(2)
				data.VATAmount=parseFloat(data.TotalAmountOfVAT -data.AmountWithoutVAT).toFixed(2);
				model.refresh();
				return;
			}
			//if(data.VATPercentage!==""&&data.AmountWithoutVAT!=="")
			if((last =="a"&&prev=="c") || (last =="c"&&prev=="a"))
			{
				data.VATAmount = parseFloat( data.VATPercentage*data.AmountWithoutVAT/100 ).toFixed(2);
				var sum = parseInt(data.VATPercentage)+ 100;
				data.TotalAmountOfVAT = parseFloat( (data.AmountWithoutVAT * sum )/100).toFixed(2);
				model.refresh();
				return;
			}
			//if(data.VATPercentage!==""&&data.VATAmount!=="")
			if((last =="a"&&prev=="d") || (last =="d"&&prev=="a"))
			{
				data.AmountWithoutVAT =  parseFloat(data.VATAmount*100/data.VATPercentage).toFixed(2)  ;
				data.TotalAmountOfVAT =  parseFloat( parseInt(data.AmountWithoutVAT)+parseInt(data.VATAmount) ).toFixed(2);
				model.refresh();
				return;
				//VATPercentage=אחוז מע"מ
				//AmountWithoutVAT=סכום ללא מע"מ
				//TotalAmountOfVAT=סכום כולל מע"מ
				//VATAmount=סכום מע"מ
			}
			//if(data.TotalAmountOfVAT!==""&&data.AmountWithoutVAT!=="")
			if((last =="c"&&prev=="b") || (last =="b"&&prev=="c"))
			{
				var num1 = parseFloat( 100 * parseInt(data.TotalAmountOfVAT)/parseInt(data.AmountWithoutVAT));
				var num2 = parseFloat(num1 - 100 );
				data.VATPercentage = parseFloat( num2).toFixed(2) ;
				data.VATAmount = parseFloat( data.AmountWithoutVAT*data.VATPercentage/100 ).toFixed(2);
				model.refresh();
			return;
			}
			//if(data.TotalAmountOfVAT!==""&&data.VATAmount!=="")
			if((last =="b"&&prev=="d") || (last =="d"&&prev=="b"))
			{
				data.AmountWithoutVAT = parseFloat( data.TotalAmountOfVAT-data.VATAmount ).toFixed(2);
				data.VATPercentage =  parseFloat(data.VATAmount*100/data.AmountWithoutVAT).toFixed(2) ;
				model.refresh();
			return;
			}
			//if(data.AmountWithoutVAT!==""&&data.VATAmount!=="")
			if((last =="c"&&prev=="d") || (last =="d"&&prev=="c"))
			{
				data.TotalAmountOfVAT =  parseFloat( parseInt(data.AmountWithoutVAT)+parseInt(data.VATAmount) ).toFixed(2);
				data.VATPercentage =   parseFloat( data.VATAmount*100/data.AmountWithoutVAT ).toFixed(2) ;
				model.refresh();
			return;
			}

			},

			copyToClipBoard : function () {
		    	var model=	this.getView().getModel("model");
				var data=model.getData();

		var textToCopy = " " +  "אחוז מעמ" + ":" + " " + " " + data.VATPercentage + " " + "סכום כולל מעמ" + " " +  ":" + " " + " " + data.TotalAmountOfVAT + " " +  "סכום ללא מעמ" + ":" + " " + data.AmountWithoutVAT + " " + "סכום מעמ" + ":" + " " + data.VATAmount + " " ;
				//var content = this.getView().byId('textArea').mProperties.text;
				navigator.clipboard.writeText(textToCopy)
				.then(() => {
				console.log("Text copied to clipboard...")
			})
				.catch(err => {
				console.log('Something went wrong', err);
			})
				document.execCommand('copy');
			},
			share: function()
			{
				const shareButton = document.querySelector('.share-button');
				const shareDialog = document.querySelector('.share-dialog');
				const closeButton = document.querySelector('.close-button');
				shareButton.addEventListener('click', event => {
  				shareDialog.classList.add('is-open');
				});
				closeButton.addEventListener('click', event => {
 			    shareDialog.classList.remove('is-open');
			});
			},

			print : function (){
				window.print();
			},
		
			delete : function(){
				var model=	this.getView().getModel("model");
				var data=model.getData();
					data.VATPercentage = '';
					data.AmountWithoutVAT  = '';
					data.TotalAmountOfVAT = '';
				    data.VATAmount = '';
					model.refresh();
					prev = null;
					last = null;
				},
		
		});
	});
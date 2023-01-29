sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("GithubSAP-UI5-Fiori-7_Element-Binding.controller.View1", {
		
		onInit : function(){
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("model/empdata.json");
			this.getView().setModel(oModel);
		},
		
		onSubmit : function(){
			var formValue = this.getView().getModel().getProperty("/addemployee");
			
			var data = this.getView().getModel().getProperty("/employees");
			
			data.push(formValue);
			
			this.getView().getModel().setProperty("/employees",data);    //setProperty 
		},
		
		onClear : function(){
			var fname = this.byId("fname");	
			var lname = this.byId("lname");	
			var age = this.byId("age");	
			var rol = this.byId("position");	
			var sal = this.byId("sal");	
			
			fname.setValue("");
			lname.setValue("");
			age.setValue("");
			rol.setValue("");
			sal.setValue("");
			
		},
		
		onRowSelect : function(oEvent){
			
			//Step 1: Get the context of the selected element
			var data = oEvent.getParameter("rowContext").sPath;
			
			//Step 2: bind the context to target element
			var oform = this.getView().byId("emp");
			
			//Step 3: bindElement is available for every controller in ui5
			oform.bindElement(data);
			
			
		}

	});
});
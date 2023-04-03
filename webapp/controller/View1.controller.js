sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet'
], function(Controller,exportLibrary,Spreadsheet) {
	"use strict";
		var EdmType = exportLibrary.EdmType;

	return Controller.extend("GithubSAP-UI5-Fiori-7_Element-Binding.controller.View1", {
		
		onInit : function(){
			var oModel = new sap.ui.model.json.JSONModel("model/empdata.json");
			// oModel.loadData("model/empdata.json");
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
			
			
		},
		
		createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: 'First name',
				property: 'firstName',
				type: EdmType.String
			
			});

			aCols.push({
				label: 'Last name',
				type: EdmType.String,
				property: 'lastName'
				
			});

			aCols.push({
				label: 'Age',
				property: 'age',
				type: EdmType.Number
			});

			aCols.push({
				label: 'Pos',
				property: 'position',
				type: EdmType.String
			});

			aCols.push({
				label: 'Salary',
				property: 'salary',
				type: EdmType.Number
			});

		



			return aCols;
		},

		onDownload: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId('employees');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding();
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export sample.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		}

	});
});
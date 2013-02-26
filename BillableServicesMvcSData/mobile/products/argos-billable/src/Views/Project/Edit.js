define('Mobile/BillableServices/Views/Project/Edit', [
    'dojo/_base/declare',
    'dojo/string',
    '../../Format',
    '../../Validator',
    'Sage/Platform/Mobile/Edit',
    'Sage/Platform/Mobile/_SDataEditMixin',
    'argos!application'
], function(
    declare,
    string,
    format,
    validator,
    Edit,
    _SDataEditMixin,
    application
) {

    return declare('Mobile.BillableServices.Views.Project.Edit', [Edit, _SDataEditMixin], {
        //Localization
        titleText: 'Edit Project',
        projectDescriptionText: 'Name',
        customerText: 'Client',
        budgetText: 'Budget',

        //View Properties
        entityName: 'Project',
        id: 'project_edit',
        insertSecurity: 'Entities/Project/Add',
        updateSecurity: 'Entities/Project/Edit',
        querySelect: [
            'ProjectDescription',
            'Customer/CustomerName',
            'Budget'
        ],
        resourceKind: 'projects',

        applyContext: function() {
            var context = application().isNavigationFromResourceKind('customers');

            var field = this.fields['Customer'];

            field.setValue({
                '$key': context['id'],
                CustomerID: parseInt(context['id'], 10),
                CustomerName: context['label']
            });
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                name: 'ProjectDescription',
                property: 'ProjectDescription',
                label: this.projectDescriptionText,
                type: 'text',
                validator: validator.hasText
            },{
                name: 'Customer',
                property: 'Customer',
                label: this.customerText,
                type: 'lookup',
                textProperty: 'CustomerName',
                keyProperty: 'CustomerID',
                view: 'client_lookup',
                validator: validator.exists
            },{
                name: 'Budget',
                property: 'Budget',
                label: this.budgetText,
                include: true,
                type: 'decimal',
                validator: validator.atLeastZero
            }]);
        }
    });
});
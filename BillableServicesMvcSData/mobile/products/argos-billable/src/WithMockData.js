define('Mobile/BillableServices/WithMockData', [
    'dojo/_base/lang',
    'dojo/store/Memory',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/Detail',
    './Views/Client/List',
    './Views/Client/Detail',
    './Views/Contact/Detail',
    './Views/Project/List',
    './Views/Project/Detail',
    './Views/ServiceCharge/List',
    './Views/ServiceCharge/Detail',
    './Views/ServiceCharge/Submit',
    './Views/ServiceType/List',
    './Views/Contact/EmailList'
], function(
    lang,
    Memory,
    util,
    List,
    Detail,
    ClientList,
    ClientDetail,
    ContactDetail,
    ProjectList,
    ProjectDetail,
    ServiceChargeList,
    ServiceChargeDetail,
    ServiceChargeSubmit,
    ServiceTypeList,
    ContactEmailList
) {
    return function(){
        lang.extend(ClientList, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {$key: 'DEMO00A1', CustomerName: 'A Client 1', CustomerID: 1},
                        {$key: 'DEMO00A2', CustomerName: 'A Client 2', CustomerID: 2},
                        {$key: 'DEMO00A3', CustomerName: 'A Client 3', CustomerID: 3},
                        {$key: 'DEMO00B1', CustomerName: 'B Client 4', CustomerID: 4},
                        {$key: 'DEMO00B2', CustomerName: 'B Client 5', CustomerID: 5},
                        {$key: 'DEMO00B3', CustomerName: 'B Client 6', CustomerID: 6},
                        {$key: 'DEMO00C1', CustomerName: 'C Client 7', CustomerID: 7},
                        {$key: 'DEMO00C2', CustomerName: 'C Client 8', CustomerID: 8},
                        {$key: 'DEMO00C3', CustomerName: 'C Client 9', CustomerID: 9},
                        {$key: 'DEMO00D1', CustomerName: 'D Client 2', CustomerID: 10},
                        {$key: 'DEMO00D2', CustomerName: 'D Client 3', CustomerID: 11},
                        {$key: 'DEMO00D3', CustomerName: 'D Client 4', CustomerID: 12},
                        {$key: 'DEMO00E1', CustomerName: 'E Client 5', CustomerID: 13},
                        {$key: 'DEMO00E2', CustomerName: 'E Client 6', CustomerID: 14},
                        {$key: 'DEMO00E3', CustomerName: 'E Client 7', CustomerID: 15},
                        {$key: 'DEMO00F1', CustomerName: 'F Client 8', CustomerID: 16},
                        {$key: 'DEMO00F2', CustomerName: 'F Client 9', CustomerID: 17},
                        {$key: 'DEMO00F3', CustomerName: 'F Client 1', CustomerID: 18},
                        {$key: 'DEMO00G1', CustomerName: 'G Client 2', CustomerID: 19},
                        {$key: 'DEMO00G2', CustomerName: 'G Client 3', CustomerID: 20},
                        {$key: 'DEMO00G3', CustomerName: 'G Client 4', CustomerID: 21},
                        {$key: 'DEMO00H1', CustomerName: 'H Client 5', CustomerID: 22},
                        {$key: 'DEMO00H2', CustomerName: 'H Client 6', CustomerID: 23},
                        {$key: 'DEMO00H3', CustomerName: 'H Client 7', CustomerID: 24},
                        {$key: 'DEMO00I1', CustomerName: 'I Client 8', CustomerID: 25},
                        {$key: 'DEMO00I2', CustomerName: 'I Client 9', CustomerID: 26},
                        {$key: 'DEMO00I3', CustomerName: 'I Client 2', CustomerID: 27},
                        {$key: 'DEMO00J1', CustomerName: 'J Client 3', CustomerID: 28},
                        {$key: 'DEMO00J2', CustomerName: 'J Client 4', CustomerID: 29},
                        {$key: 'DEMO00J3', CustomerName: 'J Client 5', CustomerID: 30},
                        {$key: 'DEMO00K1', CustomerName: 'K Client 6', CustomerID: 31},
                        {$key: 'DEMO00K2', CustomerName: 'K Client 7', CustomerID: 32},
                        {$key: 'DEMO00K3', CustomerName: 'K Client 8', CustomerID: 33},
                        {$key: 'DEMO00L1', CustomerName: 'L Client 9', CustomerID: 34},
                        {$key: 'DEMO00L2', CustomerName: 'L Client 1', CustomerID: 35},
                        {$key: 'DEMO00L3', CustomerName: 'L Client 2', CustomerID: 36},
                        {$key: 'DEMO00M1', CustomerName: 'M Client 3', CustomerID: 37},
                        {$key: 'DEMO00M2', CustomerName: 'M Client 4', CustomerID: 38},
                        {$key: 'DEMO00M3', CustomerName: 'M Client 5', CustomerID: 39},
                        {$key: 'DEMO00N1', CustomerName: 'N Client 6', CustomerID: 40},
                        {$key: 'DEMO00N2', CustomerName: 'N Client 7', CustomerID: 41},
                        {$key: 'DEMO00N3', CustomerName: 'N Client 8', CustomerID: 42},
                        {$key: 'DEMO00O1', CustomerName: 'O Client 9', CustomerID: 43},
                        {$key: 'DEMO00O2', CustomerName: 'O Client 2', CustomerID: 44},
                        {$key: 'DEMO00O3', CustomerName: 'O Client 3', CustomerID: 45},
                        {$key: 'DEMO00P1', CustomerName: 'P Client 4', CustomerID: 46},
                        {$key: 'DEMO00P2', CustomerName: 'P Client 5', CustomerID: 47},
                        {$key: 'DEMO00P3', CustomerName: 'P Client 6', CustomerID: 48},
                        {$key: 'DEMO00Q1', CustomerName: 'Q Client 7', CustomerID: 49},
                        {$key: 'DEMO00Q2', CustomerName: 'Q Client 8', CustomerID: 50},
                        {$key: 'DEMO00Q3', CustomerName: 'Q Client 9', CustomerID: 51}
                    ]
                });
            },
            _buildQueryExpression: List.prototype._buildQueryExpression
        });
        lang.extend(ClientDetail, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {
                            $key: 'DEMO00A1',
                            CustomerName: 'A Client 1',
                            StreetAddress: '6561 Irvine Center Dr',
                            City: 'Irvine',
                            StateProvince: 'CA',
                            PostalCode: '92692',
                            Contacts: [
                                {
                                    $key: 'C001',
                                    ContactName: 'Bob Loblaw',
                                    ContactTitle: 'Director'
                                },
                                {
                                    $key: 'C002',
                                    ContactName: 'Dorothy Mantooth',
                                    ContactTitle: 'Executive Administrator'
                                }
                            ]
                        }
                    ]
                });
            },
            _buildQueryExpression: Detail.prototype._buildQueryExpression
        });
        lang.extend(ContactDetail, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {
                            $key: 'C001',
                            ContactName: 'Bob Loblaw',
                            ContactTitle: 'Director',
                            OfficePhone: '6023777483',
                            HomePhone: '6023777483',
                            CellPhone: '6023777483',
                            OfficeEmailAddress: 'bloblaw@test.com',
                            PersonalEmailAddress: 'bloblaw@test.com'
                        },
                        {
                            $key: 'C002',
                            ContactName: 'Dorothy Mantooth',
                            ContactTitle: 'Executive Administrator',
                            OfficePhone: '6023777483',
                            HomePhone: '6023777483',
                            CellPhone: '6023777483',
                            OfficeEmailAddress: 'dmantooth@test.com',
                            PersonalEmailAddress: 'dmantooth@test.com'
                        }
                    ]
                });
            },
            _buildQueryExpression: Detail.prototype._buildQueryExpression
        });

        lang.extend(ProjectList, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {$key: 'PROJA001', ProjectDescription: 'A Project 1', Customer: { $key: 'DEMO00A1', CustomerName: 'Client 1'}, Date: new Date(2012, 5, 22)},
                        {$key: 'PROJA002', ProjectDescription: 'A Project 2', Customer: { $key: 'DEMO00A2', CustomerName: 'Client 2'}, Date: new Date(2012, 5, 25)},
                        {$key: 'PROJA003', ProjectDescription: 'A Project 3', Customer: { $key: 'DEMO00A3', CustomerName: 'Client 3'}, Date: new Date(2012, 3, 19)},
                        {$key: 'PROJB001', ProjectDescription: 'B Project 4', Customer: { $key: 'DEMO00A4', CustomerName: 'Client 4'}, Date: new Date(2012, 6, 4)},
                        {$key: 'PROJB002', ProjectDescription: 'B Project 5', Customer: { $key: 'DEMO00A5', CustomerName: 'Client 5'}, Date: new Date(2012, 6, 6)},
                        {$key: 'PROJB003', ProjectDescription: 'B Project 6', Customer: { $key: 'DEMO00A6', CustomerName: 'Client 6'}, Date: new Date(2012, 5, 12)},
                        {$key: 'PROJC001', ProjectDescription: 'C Project 7', Customer: { $key: 'DEMO00A7', CustomerName: 'Client 7'}, Date: new Date(2012, 5, 1)},
                        {$key: 'PROJC002', ProjectDescription: 'C Project 8', Customer: { $key: 'DEMO00A8', CustomerName: 'Client 8'}, Date: new Date(2012, 6, 1)},
                        {$key: 'PROJC003', ProjectDescription: 'C Project 9', Customer: { $key: 'DEMO00A9', CustomerName: 'Client 9'}, Date: new Date(2012, 4, 28)}
                    ]
                });
            },
            _buildQueryExpression: List.prototype._buildQueryExpression,
            groupSorts: {
                'Customer.CustomerName': [{attribute: 'Customer.CustomerName', descending: false}],
                'ProjectDescription': [{attribute: 'ProjectDescription', descending: false}],
                'Date': [{attribute: 'Date', descending: true}]
            }
        });
        lang.extend(ProjectDetail, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {
                            $key: 'PROJA001',
                            ProjectDescription: 'A Project 1',
                            Customer: {
                                $key: 'DEMO00A1',
                                CustomerName: 'A Client 1'
                            },
                            Budget: 25000,
                            BilledAmt: 12000
                        }
                    ]
                });
            },
            _buildQueryExpression: Detail.prototype._buildQueryExpression
        });

        lang.extend(ServiceChargeList, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {$key: 'SCHGA001', ServiceChargeID: 'ST001', Project: { $key: 'PROJA001', ProjectDescription: 'A Project 1'}, Customer: { $key: 'DEMO00A1', CustomerName: 'A Client 1'}, ServiceDate: new Date(2012, 5, 22), Status: 2},
                        {$key: 'SCHGA002', ServiceChargeID: 'ST002', Project: { $key: 'PROJA001', ProjectDescription: 'A Project 1'}, Customer: { $key: 'DEMO00A2', CustomerName: 'A Client 2'}, ServiceDate: new Date(2012, 5, 25), Status: 2},
                        {$key: 'SCHGA003', ServiceChargeID: 'ST003', Project: { $key: 'PROJA001', ProjectDescription: 'A Project 1'}, Customer: { $key: 'DEMO00A2', CustomerName: 'A Client 2'}, ServiceDate: new Date(2012, 3, 19), Status: 2},
                        {$key: 'SCHGB001', ServiceChargeID: 'ST004', Project: { $key: 'PROJA002', ProjectDescription: 'A Project 2'}, Customer: { $key: 'DEMO00A3', CustomerName: 'A Client 3'}, ServiceDate: new Date(2012, 6, 4), Status: 2},
                        {$key: 'SCHGB002', ServiceChargeID: 'ST005', Project: { $key: 'PROJA002', ProjectDescription: 'A Project 2'}, Customer: { $key: 'DEMO00A3', CustomerName: 'A Client 3'}, ServiceDate: new Date(2012, 6, 6), Status: 2},
                        {$key: 'SCHGB003', ServiceChargeID: 'ST006', Project: { $key: 'PROJA002', ProjectDescription: 'A Project 2'}, Customer: { $key: 'DEMO00A3', CustomerName: 'A Client 3'}, ServiceDate: new Date(2012, 5, 12), Status: 1},
                        {$key: 'SCHGC001', ServiceChargeID: 'ST007', Project: { $key: 'PROJA003', ProjectDescription: 'A Project 3'}, Customer: { $key: 'DEMO00B1', CustomerName: 'B Client 1'}, ServiceDate: new Date(2012, 6, 10), Status: 4},
                        {$key: 'SCHGC002', ServiceChargeID: 'ST008', Project: { $key: 'PROJB001', ProjectDescription: 'B Project 1'}, Customer: { $key: 'DEMO00B1', CustomerName: 'B Client 1'}, ServiceDate: new Date(2012, 6, 11), Status: 4},
                        {$key: 'SCHGC003', ServiceChargeID: 'ST009', Project: { $key: 'PROJB001', ProjectDescription: 'B Project 1'}, Customer: { $key: 'DEMO00B1', CustomerName: 'B Client 1'}, ServiceDate: new Date(2012, 6, 11), Status: 4}
                    ]
                });
            },
            _buildQueryExpression: List.prototype._buildQueryExpression,
            statusQuery: {Status: 4},
            groupSorts: {
                'Status': [{attribute: 'ServiceChargeID', descending:true}],
                'Customer.CustomerName': [{attribute: 'Customer.CustomerName', descending: false}],
                'Project.ProjectDescription': [{attribute: 'Project.ProjectDescription', descending: false}],
                'ServiceDate': [{attribute: 'ServiceDate', descending: true}]
            }
        });

        lang.extend(ServiceChargeDetail, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {
                            $key: 'SCHGA001',
                            ServiceChargeID: 'ST001',
                            Project: {
                                $key: 'PROJA001',
                                ProjectDescription: 'A Project 1'
                            },
                            Customer: {
                                $key: 'DEMO00A1',
                                CustomerName: 'A Customer 1'
                            },
                            ServiceDate: new Date(2012, 5, 22),
                            Note: 'Additional note for a submitted charge',
                            ServiceDetails: [
                                {$key: 'SD001', Qty: 100, Rate: 30, ServiceDescription: 'Design Consultation For Studio Apartment'},
                                {$key: 'SD002', Qty: 95, Rate: 45, ServiceDescription: 'Training'}
                            ],
                            Status: 1
                        },
                        {
                            $key: 'SCHGC001',
                            ServiceChargeID: 'ST007',
                            Project: {
                                $key: 'PROJA001',
                                ProjectDescription: 'A Project 1'
                            },
                            Customer: {
                                $key: 'DEMO00A1',
                                CustomerName: 'A Customer 1'
                            },
                            ServiceDate: new Date(2012, 6, 10),
                            Note: 'Additional note for a draft',
                            Status: 4
                        }
                    ]
                });
            },
            _buildQueryExpression: Detail.prototype._buildQueryExpression
        });

        lang.extend(ServiceChargeSubmit, {
            formatDependentQuery: function(fmt, property) {
                var key = util.getValue(this.item, property || '$key');
                return {CustomerID: key};
            }
        });

        lang.extend(ServiceTypeList, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {$key: 'STYP001', Detail: 'A description', ServiceDescription: 'Desktop Design', UOM: 'hours', Rate: 100, SKU: 'C001'},
                        {$key: 'STYP002', Detail: 'A description', ServiceDescription: 'Mobile Design', UOM: 'hours', Rate: 200, SKU: 'C002'},
                        {$key: 'STYP003', Detail: 'A description', ServiceDescription: 'Report Customization', UOM: 'hours', Rate: 150, SKU: 'RE001'},
                        {$key: 'STYP004', Detail: 'A description', ServiceDescription: 'Training', UOM: 'hours', Rate: 95, SKU: 'TR001'},
                        {$key: 'STYP005', Detail: 'A description', ServiceDescription: 'Hardware Upgrades', UOM: 'hours', Rate: 110, SKU: 'SYS001'},
                        {$key: 'STYP006', Detail: 'A description', ServiceDescription: 'Software Implementation', UOM: 'hours', Rate: 120, SKU: 'SYS002'},
                        {$key: 'STYP007', Detail: 'A description', ServiceDescription: 'Laptop', UOM: 'each', Rate: 1500, SKU: 'PR001'},
                        {$key: 'STYP008', Detail: 'A description', ServiceDescription: 'Hardrive', UOM: 'each', Rate: 250, SKU: 'PR002'},
                        {$key: 'STYP009', Detail: 'A description', ServiceDescription: 'Server', UOM: 'each', Rate: 2500, SKU: 'PR003'}
                    ]
                });
            },
            _buildQueryExpression: List.prototype._buildQueryExpression
        });
        lang.extend(ContactEmailList, {
            createStore: function() {
                return new Memory({
                    idProperty: '$key',
                    data: [
                        {$key: 'CONA001', ContactName: 'A Contact 1', EmailAddress: 'aContact@1.com', CustomerID: 'DEMO00A1'},
                        {$key: 'CONB002', ContactName: 'B Contact 2', EmailAddress: 'bContact@2.com', CustomerID: 'DEMO00A1'},
                        {$key: 'CONC003', ContactName: 'C Contact 3', EmailAddress: 'cContact@3.com', CustomerID: 'DEMO00A1'}
                    ]
                });
            },
            _buildQueryExpression: List.prototype._buildQueryExpression
        });
    };
});
import React, {useEffect, useState} from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import {
  load,
  IntlService,
} from '@progress/kendo-react-intl';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbers from 'cldr-numbers-full/main/es/numbers.json';
import currencies from 'cldr-numbers-full/main/es/currencies.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  currencies,
  caGregorian,
  dateFields,
  timeZoneNames
);
import { process } from '@progress/kendo-data-query';

export default function Table() {
  
  const orders = JSON.parse(sessionStorage.getItem("applications"))
  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 20,
    sort: [
      {
        field: 'id',
        dir: 'asc',
      },
    ]}
    );
  const [dataResult, setDataResult] = React.useState(
    process(orders, dataState)
  );

  const dataStateChange = (event) => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };

  const exportExcel = () => {
    _export.save();
  };

  let _export;

  return (
        <div>
          <ExcelExport
            data={orders}
            ref={(exporter) => {
              _export = exporter;
            }}
          >
            <Grid
              style={{
                height: '700px',
              }}
              sortable={true}
              filterable={true}
              groupable={true}
              reorderable={true}
              pageable={{
                buttonCount: 4,
                pageSizes: true,
              }}
              data={dataResult}
              {...dataState}
              onDataStateChange={dataStateChange}
            >
              <GridToolbar>
                <button
                  title="Export to Excel"
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                  onClick={exportExcel}
                >
                  Export to Excel
                </button>
              </GridToolbar>
              <GridColumn 
                title='App #'
                field="id" 
                width="75px" 
                locked={true}
                filterable={false}
              />
              <GridColumn
                title='Project Name'
                field="project_name"
                width="200px"
                filterable={false}
              />
              <GridColumn title='Project Address' field="project_address" width="200px" />
              <GridColumn title='Project City' field="project_city" width="200px" />
              <GridColumn
                title='Project County'
                field="project_county"
                width="200px"
              />
              <GridColumn title='Development Type' field="development_type" width="200px" />
              <GridColumn
                title='Sponsor 1'
                field="sponsor_1"
                width="200px"
              />
              <GridColumn
                title='Entity Type'
                field="entity_type_1"
                width="200px"
              />
              <GridColumn
                title='Sponsor 2'
                field="sponsor_2"
                width="200px"
              />
              <GridColumn
                title='Entity Type'
                field="entity_type_2"
                width="200px"
              />
              <GridColumn
                title='LSP Name'
                field="lead_service_provider_name"
                filterable={false}
                width="90px"
              />
              <GridColumn
                title='Community-Based Developer?'
                field="community_based_developer"
                filterable={false}
                width="235px"
              />
              <GridColumn
                title='Emerging-Developer?'
                field="emerging_developer"
                filterable={false}
                width="175px"
              />
              <GridColumn
                title='Tribal Entity?'
                field="tribal"
                filterable={false}
                width="110px"
              />
              <GridColumn
                title='Non-Tax Credit?'
                field="non_tax_credit"
                filterable={false}
                width="130px"
              />
              <GridColumn
                title='Tax Credits'
                field="tax_credits"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='Operating Subsidy'
                field="operating_subsidy_1"
                filterable={false}
                width="150px"
              />
              <GridColumn
                title='Operating Subsidy'
                field="operating_subsidy_2"
                filterable={false}
                width="150px"
              />
              <GridColumn
                title='Geofraphic Area'
                field="geographic_area"
                filterable={false}
                width="130px"
              />
              <GridColumn
                title='Large Family'
                field="large_family"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='Senior'
                field="senior"
                filterable={false}
                width="60px"
              />
              <GridColumn
                title='Special Needs'
                field="special_needs"
                filterable={false}
                width="110px"
              />
              <GridColumn
                title='Farmworker'
                field="farmworker"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='High Risk'
                field="at_high_risk"
                filterable={false}
                width="80px"
              />
              <GridColumn
                title='IIG Capital Improvement Project Type'
                field="iig_capital_improvement_project_type"
                filterable={false}
                width="280px"
              />
              <GridColumn
                title='Univeral Points Self Score'
                field="universal_points_self_score"
                filterable={false}
                width="200px"
              />
              <GridColumn
                title='MHP Score'
                field="mhp_score"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='IIG  Score'
                field="iig_score"
                filterable={false}
                width="85px"
              />
              <GridColumn
                title='VHHP Score'
                field="vhhp_score"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='FWHG Score'
                field="fwhg_score"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='Tiebreaker'
                field="tiebreaker"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='Total Restricted Units'
                field="total_restricted_units"
                filterable={false}
                width="170px"
              />
              <GridColumn
                title='Total Units'
                field="total_units"
                filterable={false}
                width="100px"
              />
              <GridColumn
                title='MHP Loan Amount'
                field="mhp_loan_amount"
                filterable={false}
                width="150px"
              />
              <GridColumn
                title='FWHG Loan Amount'
                field="fwhg_loan_amount"
                filterable={false}
                width="170px"
              />
              <GridColumn
                title='IIG Loan Amount'
                field="iig_loan_amount"
                filterable={false}
                width="140px"
              />
              <GridColumn
                title='VHHP Loan Amount'
                field="vhhp_loan_amount"
                filterable={false}
                width="160px"
              />
              <GridColumn
                title='Total Project Cost'
                field="total_project_cost"
                filterable={false}
                width="150px"
              />
              
            </Grid>
          </ExcelExport>
        </div>
  );
}
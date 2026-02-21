export interface Rates {
    accountNumber: {
        value?: string;
    };
    rateRequestControlParameters?: RateRequestControlParameters;
    requestedShipment: RequestedShipment;
    processingOptions: Array<string>;
    carrierCodes: Array<string>;
    version?: Version;
}

interface RateRequestControlParameters {
    returnTransitTimes?: boolean;
    servicesNeededOnRateFailure?: boolean;
    variableOptions?: "SATURDAY_DELIVERY" | "FREIGHT_GUARANTEE" | "SMART_POST_ALLOWED_INDICIA" | "SMARTPOST_HUB_ID";
    rateSortOrder?: "COMMITASCENDING" | "SERVICENAMETRADITIONAL" | "COMMITDESCENDING";
}

interface RequestedShipment {
    shipper: Party;
    pickupDetail?: PickupDetail;
    recipient: Party;
    serviceType?: string;
    preferredCurrency?: string;
    rateRequestType?: Array<"LIST" | "INCENTIVE" | "ACCOUNT" | "PREFERRED">;
    shipDateStamp?: string;
    pickupType: "CONTACT_FEDEX_TO_SCHEDULE" | "DROPOFF_AT_FEDEX_LOCATION" | "USE_SCHEDULED_PICKUP";
    requestedPackageLineItems: Array<RequestedPackageLineItem>;
    documentShipment?: boolean;
    variableHandlingChargeDetail?: VariableHandlingChargeDetail;
    packagingType?: string;
    totalPackageCount?: number;
    totalWeight?: number;
    shipmentSpecialServices?: ShipmentSpecialServices;
    customsClearanceDetail?: CustomsClearanceDetail;
    smartPostInfoDetail?: SmartPostInfoDetail;
}

interface Party {
    address: Address;
}

interface Address {
    streetLines?: Array<string>;
    city?: string;
    stateOrProvinceCode?: string;
    postalCode: string;
    countryCode: string;
    residential?: boolean;
}

interface PickupDetail {
    readyDateTime?: string;
    latestPickupDateTime?: string;
    courierInstructions?: string;
    requestType?: "FUTURE_DAY" | "SAME_DAY";
    requestSource?: "AUTOMATION" | "CUSTOMER_SERVICE";
}

interface Version {
    major?: number;
    minor?: number;
    patch?: number;
}

interface RequestedPackageLineItem {
    subPackagingType?: string;
    groupPackageCount?: number;
    declaredValue?: {
        amount?: number;
        currency?: string;
    };
    weight: {
        units: "KG" | "LB";
        value: number;
    };
    dimensions?: {
        length: number;
        width: number;
        height: number;
        units: "CM" | "IN";
    };
    variableHandlingChargeDetail?: VariableHandlingChargeDetail;
    packageSpecialServices?: PackageSpecialServices;
}

interface VariableHandlingChargeDetail {
    rateType?: "ACCOUNT" | "ACTUAL" | "CURRENT" | "CUSTOM" | "LIST" | "INCENTIVE" | "PREFERRED" | "PREFERRED_INCENTIVE" | "PREFERRED_CURRENCY";
    percentValue?: number;
    rateLevelType?: "BUNDLED_RATE" | "INDIVIDUAL_PACKAGE_RATE";
    fixedValue?: {
        amount?: number;
        currency?: string;
    };
    rateElementBasis: "NET_CHARGE" | "NET_FREIGHT" | "BASE_CHARGE" | "NET_CHARGE_EXCLUDING_TAXES";
}

interface PackageSpecialServices {
    specialServiceTypes?: Array<string>;
    signatureOptionType?: "SERVICE_DEFAULT" | "NO_SIGNATURE_REQUIRED" | "INDIRECT" | "DIRECT" | "ADULT";
    alcoholDetail?: {
        alcoholRecipientType: "LICENSEE" | "CONSUMER";
        shipperAgreementType?: string;
    };
    dangerousGoodsDetail?: DangerousGoodsDetail;
    packageCODDetail?: PackageCODDetail;
    pieceCountVerificationBoxCount?: number;
    batteryDetails?: Array<BatteryDetail>;
    dryIceWeight?: {
        units: "KG" | "LB";
        value: number;
    };
    standaloneBatteryDetails?: Array<StandaloneBatteryDetail>;
}

interface DangerousGoodsDetail {
    accessibility?: "ACCESSIBLE" | "INACCESSIBLE";
    options?: Array<"HAZARDOUS_MATERIALS" | "BATTERY" | "ORM_D" | "REPORTABLE_QUANTITIES" | "SMALL_QUANTITY_EXCEPTION" | "LIMITED_QUANTITIES_COMMODITIES">;
    containers?: Array<Container>;
    regulation?: "ADR" | "DOT" | "IATA" | "ORMD";
}

interface Container {
    offeror?: string;
    hazardousCommodities?: Array<HazardousCommodity>;
    numberOfContainers?: number;
    containerType?: string;
    emergencyContactNumber?: EmergencyContactNumber;
    packaging?: {
        count?: number;
        units?: string;
    };
    packingType?: "ALL_PACKED_IN_ONE";
    radioactiveContainerClass?: "EXCEPTED_PACKAGE" | "INDUSTRIAL_IP1" | "INDUSTRIAL_IP2" | "INDUSTRIAL_IP3" | "TYPE_A" | "TYPE_B_M" | "TYPE_B_U" | "TYPE_C";
}

interface EmergencyContactNumber {
    areaCode: string;
    extension?: string;
    countryCode: string;
    personalIdentificationNumber?: string;
    localNumber?: string;
}

interface HazardousCommodity {
    quantity?: Quantity;
    innerReceptacles?: Array<{
        quantity?: Quantity;
    }>;
    options?: Options;
    description?: Description;
}

interface Quantity {
    quantityType?: "GROSS" | "NET";
    amount?: number;
    units?: string;
}

interface Options {
    labelTextOption?: "APPEND" | "OVERRIDE" | "STANDARD";
    customerSuppliedLabelText?: string;
}

interface Description {
    sequenceNumber?: number;
    processingOptions?: Array<"INCLUDE_SPECIAL_PROVISIONS">;
    subsidiaryClasses?: Array<string>;
    labelText?: string;
    technicalName?: string;
    packingDetails?: {
        packingInstructions?: string;
        cargoAircraftOnly?: boolean;
    };
    authorization?: string;
    reportableQuantity?: boolean;
    percentage?: number;
    id?: string;
    packingGroup?: "DEFAULT" | "I" | "II" | "III";
    properShippingName?: string;
    hazardClass?: string;
}

interface PackageCODDetail {
    codCollectionAmount?: {
        amount?: number;
        currency?: string;
    };
    codCollectionType?: "ANY" | "CASH" | "COMPANY_CHECK" | "GUARANTEED_FUNDS" | "PERSONAL_CHECK";
}

interface BatteryDetail {
    material?: "LITHIUM_METAL" | "LITHIUM_ION";
    regulatorySubType?: "IATA_SECTION_II";
    packing?: "CONTAINED_IN_EQUIPMENT" | "PACKED_WITH_EQUIPMENT";
}

interface StandaloneBatteryDetail {
    batteryMaterialType?: "LITHIUM_METAL" | "LITHIUM_ION";
}

interface ShipmentSpecialServices {
    returnShipmentDetail?: {
        returnType?: "FEDEX_TAG" | "PENDING" | "PRINT_RETURN_LABEL" | "EMAIL_LABEL" | "NET_RETURN" | "VOICE_CALL_TAG";
    };
    specialServiceTypes?: Array<string>;
}

interface CustomsClearanceDetail {
    brokers?: Array<{
        broker: {
            address: Address;
            accountNumber: {
                value?: string;
            };
            contact: any;
        };
        type: "IMPORT";
    }>;
    commercialInvoice?: {
        shipmentPurpose?: "GIFT" | "NOT_SOLD" | "PERSONAL_EFFECTS" | "REPAIR_AND_RETURN" | "SAMPLE" | "SOLD" | "COMMERCIAL" | "RETURN_AND_REPAIR" | "PERSONAL_USE";
    };
    freightOnValue?: "CARRIER_RISK" | "OWN_RISK";
    dutiesPayment?: {
        paymentType?: "SENDER";
        payor?: {
            responsibleParty?: {
                address?: Address;
                contact?: any;
                accountNumber?: {
                    value?: string;
                };
            };
        };
    };
    commodities?: Array<{
        description: string;
        weight: {
            units: "KG" | "LB";
            value: number;
        };
        quantity: number;
        customsValue: {
            amount?: number;
            currency?: string;
        };
        unitPrice?: {
            amount?: number;
            currency?: string;
        };
        numberOfPieces?: number;
        countryOfManufacture: string;
        quantityUnits: string;
        name?: string;
        harmonizedCode?: string;
        partNumber?: string;
    }>;
}

interface SmartPostInfoDetail {
    ancillaryEndorsement?: "ADDRESS_CORRECTION" | "CARRIER_LEAVE_IF_NO_RESPONSE" | "CHANGE_SERVICE" | "FORWARDING_SERVICE" | "RETURN_SERVICE";
    hubId?: string;
    indicia?: "MEDIA_MAIL" | "PARCEL_RETURN" | "PARCEL_SELECT" | "PRESORTED_BOUND_PRINTED_MATTER" | "PRESORTED_STANDARD";
    specialServices?: "USPS_DELIVERY_CONFIRMATION";
}
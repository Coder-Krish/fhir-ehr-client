export interface FhirPatient {
    resourceType: 'Patient';
    id?: string;
    meta?: {
        versionId?: string;
        lastUpdated?: string;
    };
    identifier?: Array<{
        use?: string;
        type?: {
            coding?: Array<{
                system?: string;
                code?: string;
                display?: string;
            }>;
        };
        system?: string;
        value?: string;
    }>;
    active?: boolean;
    name?: Array<{
        use?: string;
        text?: string;
        family?: Array<string>;
        given?: Array<string>;
        prefix?:Array<string>;
    }>;
    telecom?: Array<{
        system?: string;
        value?: string;
        use?: string;
    }>;
    gender?: string;
    birthDate?: string;
    address?: Array<{
        use?: string;
        type?: string;
        text?: string;
        line?: Array<string>;
        city?: string;
        district?: string;
        state?: string;
        postalCode?: string;
        country?: string;
    }>;
    contact?: Array<{
        relationship?: Array<{
            coding?: Array<{
                system?: string;
                code?: string;
                display?: string;
            }>;
        }>;
        name?: {
            use?: string;
            text?: string;
            family?: Array<string>;
            given?: Array<string>;
        };
        telecom?: Array<{
            system?: string;
            value?: string;
            use?: string;
        }>;
        address?: {
            use?: string;
            type?: string;
            text?: string;
            line?: Array<string>;
            city?: string;
            district?: string;
            state?: string;
            postalCode?: string;
            country?: string;
        };
        gender?: string;
        organization?: {
            reference?: string;
            display?: string;
        };
    }>;
    managingOrganization?: {
        reference?: string;
        display?: string;
    };
}

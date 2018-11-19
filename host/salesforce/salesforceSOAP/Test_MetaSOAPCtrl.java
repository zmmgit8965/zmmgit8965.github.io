public class Test_MetaSOAPCtrl {
    public Test_MetaSOAPCtrl(){
    }
    
    @AuraEnabled
    public static List<String> getLayouts(String objectApiName) {
    	List<String> layoutNames ;
        partnerSoapSforceComP.Soap p = new partnerSoapSforceComP.Soap();
        partnerSoapSforceComP.LoginResult result = p.login('userName','pass');
        
        partnerSoapSforceComP.SessionHeader_element sh = new partnerSoapSforceComP.SessionHeader_element();
        sh.sessionId = result.sessionId;
        p.SessionHeader = sh;
        p.endpoint_x = result.serverUrl;
        
        partnerSoapSforceComP.DescribeLayoutResult dlr = p.describeLayout(objectApiName,null,null);

        List<String> ids = new List<String>();
        for(partnerSoapSforceComP.DescribeLayout layout : dlr.layouts){
            ids.add(layout.Id);
        }
        
        toolingSoapSforceCom.SforceService ss = new toolingSoapSforceCom.SforceService();
        toolingSoapSforceCom.LoginResult loginResult = ss.login('userName','pass');
        
        toolingSoapSforceCom.SessionHeader_element sHeader = new toolingSoapSforceCom.SessionHeader_element();
        sHeader.sessionId = loginResult.sessionId;
        ss.SessionHeader = sHeader;
        ss.endpoint_x = loginResult.serverUrl;
        
        layoutNames = new List<String>();
        
        toolingSoapSforceCom.QueryResult qr = ss.query('SELECT Id,Name FROM Layout WHERE Id IN (\'' + String.join(ids, '\',\'') + '\')');
        for(sobjectToolingSoapSforceCom.sObject_x o : qr.records){
            layoutNames.add(o.Name);
        }
        
        System.debug(layoutNames);
        
        return layoutNames;
    }
	
    
}
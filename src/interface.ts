interface Employee {
  EMP_ID: number;      
  EMP_NAME: string;  
  BIRTH_DATE: string; 
  DEPT_ID: number;     
  EMAIL: string;       
  MANAGER_ID: number | null;  
  SALARY: number;      
  TAX_CODE: string;   
}


interface AuditLog {
  auditId: number;          
  actionType: string;       
  empId: number;     
  changedBy: string;        
  actionTime: string;       
  oldData: string;   
  newData: string;   
}

  
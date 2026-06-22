export interface XCRecording {
  id: string;
  gen: string;
  sp: string;
  en: string;
  cnt: string;
  loc: string;
  file: string;
  "file-name": string;
  lic: string;
  q: string;
  length: string;
  type: string;
  rec: string;
}

export interface XCResponse {
  numRecordings: string;
  numSpecies: string;
  numPages: number;
  page: number;
  recordings: XCRecording[];
}

import PhoneModel from './PhoneModel';
import PhoneForm from './PhoneForm';

let phones : PhoneModel[] = [
    new PhoneModel(1, '마리오', '서울', ['01012345678', '021234567']),
    new PhoneModel(2, '루이지', '평택', ['01023456789']),
    new PhoneModel(3, '와리오', '양주', ['01022334455', '0312345678']),
    new PhoneModel(4, '버섯돌이', '가평', ['0312468135'])
];

export function findAll() : PhoneModel[] {
    return phones
} 

export function findOne(id : number) : PhoneModel | null {
    const phone = phones.filter(phoneModel => phoneModel.getId === id);
    return phone.length === 0 ? null : phone[0];
}

export function create(phoneForm : PhoneForm) : string {
    const lastPhone = phones.slice(-1);
    if(phones.length > 0) {
        const newPhone = new PhoneModel(lastPhone[0].getId + 1, phoneForm.getName, phoneForm.getAddress, phoneForm.getPhones);
        phones.push(newPhone);
    } else {
        const newPhone = new PhoneModel(1, phoneForm.getName, phoneForm.getAddress, phoneForm.getPhones);
        phones.push(newPhone);
    }
    return `${phoneForm.getName} 님의 전화 번호 정보가 추가 되었습니다.`;
}

export function update(id : number, phoneForm : PhoneForm) : string {
    const idx = phones.map(eachPhone => eachPhone.getId).indexOf(id);
    if(idx !== -1) {
        phones[idx] = new PhoneModel(id, phoneForm.getName, phoneForm.getAddress, phoneForm.getPhones);
        return `${phoneForm.getName} 님의 전화 번호 정보가 변경 되었습니다.`;
    } else {
        return `${phoneForm.getName} 님의 전화 번호 정보가 존재하지 않습니다.`;
    }
}

export function deleteById(id : number) : string {
    const idx = phones.map(phone => phone.getId).indexOf(id);
    if(idx !== -1) {
        const tmpName = phones[idx].getName;
        phones.splice(idx, 1);
        return `${tmpName} 님의 전화 번호 정보가 삭제 되었습니다.`;
    } else {
        return '해당 아이디로 존재하는 전화 번호 정보가 존재하지 않습니다.';
    }
}

export function deleteAll() : string {
    if(phones.length > 0){
        phones = [];
        return '현재 저장된 모든 전화 번호 저장 목록을 모두 삭제 하였습니다.';
    } else {
        return '전화 번호 정보가 아무 것도 존재하지 않아 삭제 작업을 이루지 못 했습니다.';
    }
}
import { member } from "@prisma/client";

export const computeMemberImage = (members: member[]) => {
    return members.map(member => {
        member.photo = member.photo && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/users/' + member.photo;
        member.photo_ktp = member.photo_ktp && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/users/' + member.photo_ktp;
        return member;
    })
}

export const computeOneMemberImage = (member: member) => {
    member.photo = member.photo && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/users/' + member.photo;
    member.photo_ktp = member.photo_ktp && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/users/' + member.photo_ktp;
    return member;
}

export const computeImages = (data: any[], path: string) => {
    return data.map(item => {
        const images = item.image.split(',').map(val => val && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/'+ path + '/' + val);
        item.image = images.join(',');
        return item;
    })
}

export const computeImage = (data: any[], path: string) => {
    return data.map(item => {
        item.image = item.image && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/'+ path + '/' + item.image;
        return item;
    })
}

export const computeOneImages = (data: any, path: string) => {
    const images = data.image.split(',').map(val => val && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/'+ path + '/' + val);
    data.image = images.join(',');
    return data;
}

export const computeOneImage = (data: any, path: string) => {
    data.image = data.image && process.env.DOMAIN_GCP + '/bucket-golkar-sarolangun/'+ path + '/' + data.image;
    return data;
}
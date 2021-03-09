import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

import { ProfileImage } from "../models/profile-image";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileImageService {
  private profiles: ProfileImage[] = [];
  private profiles$ = new Subject<ProfileImage[]>();
  readonly url = "http://localhost:3000/api/profilesImages";

  constructor(private http: HttpClient) {}

  getProfiles() {
    this.http
      .get<{ profiles: ProfileImage[] }>(this.url)
      .pipe(
        map((profileData) => {
          return profileData.profiles;
        })
      )
      .subscribe((profiles) => {
        this.profiles = profiles;
        this.profiles$.next(this.profiles);
      });
  }

  getProfilesStream() {
    return this.profiles$.asObservable();
  }

  addProfile(name: string, image: File): void {
    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("image", image, name);
    this.http
      .post<{ profile: ProfileImage }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile: ProfileImage = {

          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }
}

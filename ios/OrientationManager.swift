//
//  OrientationManager.swift
//  JawaAudit
//
//  Created by Purushotam Baheti on 18/04/25.
//

import Foundation

@objc(OrientationManager)
class OrientationManager: NSObject {
  @objc func lockToLandscape() {
    OrientationLocker.lockOrientation(.landscape)
  }

  @objc func lockToPortrait() {
    OrientationLocker.lockOrientation(.portrait)
  }
}

//
//  OrientationLocker.swift
//  JawaAudit
//
//  Created by Purushotam Baheti on 18/04/25.
//

import Foundation
@objc public class OrientationLocker: NSObject {
  @objc public static var orientationLock: UIInterfaceOrientationMask = .portrait

  @objc public static func lockOrientation(_ orientation: UIInterfaceOrientationMask) {
    self.orientationLock = orientation

    let value: UIInterfaceOrientation = orientation == .landscape ? .landscapeRight : .portrait
    UIDevice.current.setValue(value.rawValue, forKey: "orientation")
    UIViewController.attemptRotationToDeviceOrientation()
  }
}
